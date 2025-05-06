import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, MapPin, Calendar, Upload } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import DashboardLayout from '@/components/DashboardLayout';
import { patientService, PatientProfile, ProfileUpdateData } from '@/services/patient.service';
import { authService, User as UserType } from '@/services/auth.service';
import { useToast } from '@/hooks/use-toast';

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);
  const [profile, setProfile] = useState<PatientProfile | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Formulaire
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    gender: '',
    age: '',
    medicalHistory: ''
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        
        // Charger les données utilisateur
        const userData = await authService.getUser();
        setUser(userData);
        
        // Charger le profil du patient
        try {
          const patientProfileData = await patientService.getProfile();
          setProfile(patientProfileData);
          
          // Initialiser le formulaire avec les données du profil
          setFormData({
            name: userData.name || '',
            email: userData.email || '',
            phone: patientProfileData.phone || '',
            address: patientProfileData.address || '',
            gender: patientProfileData.gender || '',
            age: patientProfileData.age ? patientProfileData.age.toString() : '',
            medicalHistory: patientProfileData.medicalHistory || ''
          });

          // Charger l'image de profil si elle existe
          if (userData.profile_photo_path) {
            const photoUrl = userData.profile_photo_path.startsWith('http') 
              ? userData.profile_photo_path 
              : `${import.meta.env.VITE_API_URL}/storage/${userData.profile_photo_path}`;
            setProfileImage(photoUrl);
          }
        } catch (profileErr) {
          console.error('Error fetching patient profile:', profileErr);
          // Initialiser le formulaire avec les données de base de l'utilisateur
          setFormData({
            name: userData.name || '',
            email: userData.email || '',
            phone: '',
            address: '',
            gender: '',
            age: '',
            medicalHistory: ''
          });
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching user data:', err);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load profile data. Please try again later."
        });
        setLoading(false);
      }
    };
    
    fetchUserData();
  }, [toast]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      
      // Créer une URL pour prévisualiser l'image
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setProfileImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      // Préparer les données à mettre à jour
      const updateData: ProfileUpdateData = {
        name: formData.name,
        gender: formData.gender,
        age: formData.age ? parseInt(formData.age) : undefined,
        phone: formData.phone,
        address: formData.address,
        medicalHistory: formData.medicalHistory
      };

      // Mettre à jour le profil
      await patientService.updateProfile(updateData);

      // Si une nouvelle image a été sélectionnée, la télécharger
      if (imageFile) {
        const formData = new FormData();
        formData.append('profile_photo', imageFile);
        
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user/profile-photo`, {
          method: 'POST',
          credentials: 'include',
          body: formData
        });

        if (!response.ok) {
          throw new Error('Failed to upload profile photo');
        }
      }

      toast({
        title: "Success",
        description: "Your profile has been updated successfully."
      });

      // Rediriger vers le tableau de bord
      navigate('/dashboard');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update profile. Please try again."
      });
    } finally {
      setSaving(false);
    }
  };

  // Obtenir les initiales pour l'avatar par défaut
  const getUserInitials = () => {
    if (!formData.name) return 'U';
    
    const nameParts = formData.name.split(' ');
    if (nameParts.length === 1) return nameParts[0].charAt(0).toUpperCase();
    
    return `${nameParts[0].charAt(0)}${nameParts[nameParts.length - 1].charAt(0)}`.toUpperCase();
  };

  return (
    <DashboardLayout userType="patient">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">My Profile</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Photo de profil et informations de base */}
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Profile Photo</CardTitle>
                <CardDescription>Update your profile picture</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <div 
                  className="relative cursor-pointer mb-4" 
                  onClick={handleImageClick}
                >
                  <Avatar className="h-32 w-32">
                    {profileImage ? (
                      <AvatarImage src={profileImage} alt={formData.name} />
                    ) : (
                      <AvatarFallback className="bg-primary text-white text-4xl">
                        {getUserInitials()}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div className="absolute bottom-0 right-0 bg-primary text-white p-1 rounded-full">
                    <Upload className="h-4 w-4" />
                  </div>
                </div>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*" 
                  onChange={handleImageChange}
                />
                <p className="text-sm text-gray-500 text-center">
                  Click on the avatar to upload a new photo
                </p>
              </CardContent>
            </Card>

            {/* Informations personnelles */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                      <Input 
                        id="name" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleInputChange} 
                        className="pl-10" 
                        placeholder="Your full name"
                        disabled={loading}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                      <Input 
                        id="email" 
                        name="email" 
                        value={formData.email} 
                        className="pl-10" 
                        placeholder="Your email"
                        disabled={true} // Email ne peut pas être modifié
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                      <Input 
                        id="phone" 
                        name="phone" 
                        value={formData.phone} 
                        onChange={handleInputChange} 
                        className="pl-10" 
                        placeholder="Your phone number"
                        disabled={loading}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                      <Input 
                        id="age" 
                        name="age" 
                        type="number" 
                        value={formData.age} 
                        onChange={handleInputChange} 
                        className="pl-10" 
                        placeholder="Your age"
                        disabled={loading}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <select 
                      id="gender" 
                      name="gender" 
                      value={formData.gender} 
                      onChange={handleInputChange as any} 
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      disabled={loading}
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 text-gray-500 h-4 w-4" />
                      <Textarea 
                        id="address" 
                        name="address" 
                        value={formData.address} 
                        onChange={handleInputChange} 
                        className="pl-10 min-h-[80px]" 
                        placeholder="Your address"
                        disabled={loading}
                      />
                    </div>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="medicalHistory">Medical History</Label>
                    <Textarea 
                      id="medicalHistory" 
                      name="medicalHistory" 
                      value={formData.medicalHistory} 
                      onChange={handleInputChange} 
                      className="min-h-[120px]" 
                      placeholder="Any relevant medical history"
                      disabled={loading}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button type="submit" disabled={loading || saving}>
                  {saving ? "Saving..." : "Save Changes"}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default Profile;

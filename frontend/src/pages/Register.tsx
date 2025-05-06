
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, User, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Logo from '@/components/Logo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useTranslation } from 'react-i18next';
import { useToast } from '@/hooks/use-toast';
import { authService, RegisterData } from '@/services/auth.service';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<RegisterData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    userType: 'patient'
  });
  const { t } = useTranslation();
  const { toast } = useToast();
  const navigate = useNavigate();

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleRadioChange = (value: string) => {
    setFormData(prev => ({ ...prev, userType: value as 'patient' | 'doctor' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await authService.register(formData);
      toast({
        title: t("Success"),
        description: t("Your account has been created successfully"),
      });
      navigate('/login');
    } catch (error) {
      toast({
        variant: "destructive",
        title: t("Registration Failed"),
        description: error instanceof Error ? error.message : t("An error occurred during registration"),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1 flex flex-col items-center">
            <div className="mb-2">
              <Logo />
            </div>
            <CardTitle className="text-2xl font-bold">{t("Create an Account")}</CardTitle>
            <CardDescription>
              {t("Sign up to start using HealthConnect")}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">{t("First Name")}</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                    <Input 
                      id="firstName" 
                      placeholder={t("John")} 
                      className="pl-10"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">{t("Last Name")}</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                    <Input 
                      id="lastName" 
                      placeholder={t("Doe")} 
                      className="pl-10"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">{t("Email")}</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder={t("name@example.com")} 
                    className="pl-10"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">{t("Password")}</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                  <Input 
                    id="password" 
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••" 
                    className="pl-10"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                  />
                  <button 
                    type="button"
                    onClick={toggleShowPassword}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                <p className="text-xs text-gray-500">{t("Password must be at least 8 characters long")}</p>
              </div>
              
              <div className="space-y-2">
                <Label>{t("I am a...")}</Label>
                <RadioGroup 
                  defaultValue={formData.userType}
                  onValueChange={handleRadioChange}
                  className="flex space-x-2"
                >
                  <div className="flex items-center space-x-2 border rounded-md p-3 flex-1 cursor-pointer hover:bg-gray-50">
                    <RadioGroupItem value="patient" id="patient" disabled={isLoading} />
                    <Label htmlFor="patient" className="cursor-pointer">{t("Patient")}</Label>
                  </div>
                  <div className="flex items-center space-x-2 border rounded-md p-3 flex-1 cursor-pointer hover:bg-gray-50">
                    <RadioGroupItem value="doctor" id="doctor" disabled={isLoading} />
                    <Label htmlFor="doctor" className="cursor-pointer">{t("Healthcare Provider")}</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="flex items-center space-x-2 pt-2">
                <input 
                  type="checkbox" 
                  id="terms" 
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  required
                  disabled={isLoading}
                />
                <Label htmlFor="terms" className="text-sm text-gray-600">
                  {t("I agree to the")}{" "}
                  <Link to="/terms" className="text-secondary hover:text-secondary-dark">
                    {t("Terms of Service")}
                  </Link>{" "}
                  {t("and")}{" "}
                  <Link to="/privacy" className="text-secondary hover:text-secondary-dark">
                    {t("Privacy Policy")}
                  </Link>
                </Label>
              </div>
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>{t("Creating Account...")}</>
                ) : (
                  <>
                    <UserPlus className="mr-2 h-4 w-4" />
                    {t("Create Account")}
                  </>
                )}
              </Button>
            </form>
          </CardContent>
          
          <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-600">
              {t("Already have an account?")}{" "}
              <Link to="/login" className="text-secondary font-medium hover:text-secondary-dark">
                {t("Sign in")}
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default Register;

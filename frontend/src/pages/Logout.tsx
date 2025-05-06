import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Logo from '@/components/Logo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useTranslation } from 'react-i18next';
import { useToast } from '@/hooks/use-toast';
import { authService } from '@/services/auth.service';

const Logout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogout = useCallback(async () => {
    setIsLoading(true);

    try {
      await authService.logout();
      toast({
        title: t("Success"),
        description: t("You have been logged out successfully"),
      });
      // Rediriger vers la page de connexion après un court délai
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (error) {
      toast({
        variant: "destructive",
        title: t("Error"),
        description: error instanceof Error ? error.message : t("An error occurred during logout"),
      });
      // Même en cas d'erreur, rediriger vers la page de connexion
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } finally {
      setIsLoading(false);
    }
  }, [navigate, t, toast]);

  // Déclencher automatiquement la déconnexion lorsque la page est chargée
  useEffect(() => {
    handleLogout();
  }, [handleLogout]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1 flex flex-col items-center">
            <div className="mb-2">
              <Logo />
            </div>
            <CardTitle className="text-2xl font-bold">{t("Logging Out")}</CardTitle>
            <CardDescription>
              {t("Please wait while we securely log you out")}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="flex flex-col items-center">
            <div className="my-8 text-center">
              <div className="flex justify-center mb-4">
                <LogOut className="h-16 w-16 text-primary animate-pulse" />
              </div>
              <p className="text-gray-600">
                {isLoading ? t("Signing out...") : t("You have been successfully logged out")}
              </p>
            </div>
            
            <Button 
              onClick={() => navigate('/login')} 
              className="w-full mt-4"
              disabled={isLoading}
            >
              {t("Return to Login")}
            </Button>
          </CardContent>
          
          <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-600">
              {t("Thank you for using our service")}
            </p>
          </CardFooter>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default Logout;

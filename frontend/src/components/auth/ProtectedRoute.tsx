import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredUserType?: 'patient' | 'doctor';
}

export function ProtectedRoute({ children, requiredUserType }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredUserType && user.user_type !== requiredUserType) {
    const redirectPath = user.user_type === 'doctor' ? '/dashboard/doctor' : '/dashboard/patient';
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
}

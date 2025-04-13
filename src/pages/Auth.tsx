
import React from 'react';
import AuthForm from '@/components/auth/AuthForm';
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';

const Auth: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // If the user is already authenticated, redirect to dashboard
  React.useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md mb-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold gradient-purple gradient-text">EmpowerFit</h1>
          <p className="text-gray-600 mt-2">Track. Progress. Achieve.</p>
        </div>
        <AuthForm />
      </div>
      <div className="w-full max-w-md text-center mt-6 text-sm text-gray-500">
        <p>By signing up, you agree to our Terms of Service and Privacy Policy.</p>
      </div>
    </div>
  );
};

export default Auth;

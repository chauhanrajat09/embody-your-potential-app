
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const AuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // The auth state change will be handled by the AuthProvider
    // This is just to handle the redirect after OAuth authentication
    
    toast({
      title: "Authentication successful",
      description: "You have been logged in successfully.",
    });
    
    navigate('/dashboard');
  }, [navigate, toast]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-2xl font-bold gradient-purple gradient-text mb-4">Logging you in...</h1>
        <div className="animate-pulse">Please wait</div>
      </div>
    </div>
  );
};

export default AuthCallback;

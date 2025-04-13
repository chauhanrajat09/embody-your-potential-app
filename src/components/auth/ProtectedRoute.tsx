
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from 'lucide-react';

const ProtectedRoute: React.FC = () => {
  const { isAuthenticated, isLoading, isConfigured } = useAuth();
  
  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold gradient-purple gradient-text mb-4">Loading...</h1>
          <div className="animate-pulse">Please wait</div>
        </div>
      </div>
    );
  }

  // Show configuration error if Supabase is not properly configured
  if (!isConfigured) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="max-w-lg w-full">
          <Alert variant="destructive" className="mb-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Configuration Error</AlertTitle>
            <AlertDescription>
              Supabase is not properly configured. Please set up your Supabase URL and Anonymous Key in the environment variables.
            </AlertDescription>
          </Alert>
          <div className="text-center">
            <p className="mb-4">To fix this issue:</p>
            <ol className="text-left list-decimal pl-8 mb-4 space-y-2">
              <li>Go to your Supabase project dashboard</li>
              <li>Get your project URL and anon/public key</li>
              <li>Set them as environment variables:</li>
              <ul className="list-disc pl-8 mt-2">
                <li><code className="bg-gray-100 px-2 py-1 rounded">VITE_SUPABASE_URL</code></li>
                <li><code className="bg-gray-100 px-2 py-1 rounded">VITE_SUPABASE_ANON_KEY</code></li>
              </ul>
            </ol>
            <div className="mt-4">
              <a href="/" className="text-purple-600 hover:underline">Return to home page</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Redirect to auth page if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }
  
  // Render child routes if authenticated
  return <Outlet />;
};

export default ProtectedRoute;


import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { AtSign, Lock, AlertCircle } from "lucide-react";
import { FcGoogle } from 'react-icons/fc';
import { FaDiscord } from 'react-icons/fa';
import { useAuth } from '@/hooks/use-auth';
import { useNavigate } from 'react-router-dom';

const AuthForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [activeTab, setActiveTab] = useState<string>('login');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { signIn, signUp, signInWithGoogle, signInWithDiscord } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    setError(null);
    
    if (!email || !password) {
      setError("Please fill in all required fields");
      return false;
    }
    
    if (!email.includes('@')) {
      setError("Please enter a valid email address");
      return false;
    }
    
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    
    if (activeTab === 'register' && password !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      if (activeTab === 'login') {
        const { error } = await signIn(email, password);
        if (error) throw error;
        
        toast({
          title: "Logged In",
          description: "Welcome back!",
        });
        
        navigate('/dashboard');
      } else {
        const { error } = await signUp(email, password);
        if (error) throw error;
        
        toast({
          title: "Account Created",
          description: "Check your email to confirm your account.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Authentication Error",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
      setError(error.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'discord') => {
    try {
      if (provider === 'google') {
        await signInWithGoogle();
      } else {
        await signInWithDiscord();
      }
    } catch (error: any) {
      toast({
        title: `${provider} Login Failed`,
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center gradient-purple gradient-text">
          {activeTab === 'login' ? 'Welcome Back' : 'Join EmpowerFit'}
        </CardTitle>
        <CardDescription className="text-center">
          {activeTab === 'login' 
            ? 'Sign in to access your workouts and progress' 
            : 'Create an account to start your fitness journey'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center border rounded-md px-3 py-2">
                  <AtSign className="h-5 w-5 text-gray-400 mr-2" />
                  <Input 
                    type="email" 
                    placeholder="Email"
                    className="border-none focus:outline-none focus:ring-0 p-0"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center border rounded-md px-3 py-2">
                  <Lock className="h-5 w-5 text-gray-400 mr-2" />
                  <Input 
                    type="password" 
                    placeholder="Password"
                    className="border-none focus:outline-none focus:ring-0 p-0"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
              </div>

              {error && (
                <div className="bg-red-50 text-red-500 px-3 py-2 rounded-md text-sm flex items-center">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  {error}
                </div>
              )}

              <Button className="w-full gradient-purple" type="submit" disabled={isLoading}>
                {isLoading ? "Loading..." : "Log In"}
              </Button>
            </form>
          </TabsContent>
          <TabsContent value="register">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center border rounded-md px-3 py-2">
                  <AtSign className="h-5 w-5 text-gray-400 mr-2" />
                  <Input 
                    type="email" 
                    placeholder="Email"
                    className="border-none focus:outline-none focus:ring-0 p-0"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center border rounded-md px-3 py-2">
                  <Lock className="h-5 w-5 text-gray-400 mr-2" />
                  <Input 
                    type="password" 
                    placeholder="Password"
                    className="border-none focus:outline-none focus:ring-0 p-0"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center border rounded-md px-3 py-2">
                  <Lock className="h-5 w-5 text-gray-400 mr-2" />
                  <Input 
                    type="password" 
                    placeholder="Confirm Password"
                    className="border-none focus:outline-none focus:ring-0 p-0"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
              </div>

              {error && (
                <div className="bg-red-50 text-red-500 px-3 py-2 rounded-md text-sm flex items-center">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  {error}
                </div>
              )}

              <Button className="w-full gradient-purple" type="submit" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Register"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <Button 
              variant="outline" 
              type="button" 
              className="flex items-center justify-center"
              onClick={() => handleSocialLogin('google')}
              disabled={isLoading}
            >
              <FcGoogle className="mr-2 h-5 w-5" />
              Google
            </Button>
            <Button 
              variant="outline" 
              type="button" 
              className="flex items-center justify-center"
              onClick={() => handleSocialLogin('discord')}
              disabled={isLoading}
            >
              <FaDiscord className="mr-2 h-5 w-5 text-indigo-600" />
              Discord
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center text-sm">
        {activeTab === 'login' ? (
          <p>Don't have an account? <span onClick={() => setActiveTab('register')} className="text-empowerfit-purple font-semibold cursor-pointer">Register</span></p>
        ) : (
          <p>Already have an account? <span onClick={() => setActiveTab('login')} className="text-empowerfit-purple font-semibold cursor-pointer">Login</span></p>
        )}
      </CardFooter>
    </Card>
  );
};

export default AuthForm;

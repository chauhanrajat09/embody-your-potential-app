
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { AtSign, Lock, GithubIcon, Mail } from "lucide-react";

interface AuthFormProps {
  onSubmit: (email: string, password: string, isLogin: boolean) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<string>('login');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }
    
    onSubmit(email, password, activeTab === 'login');
  };

  const handleSocialLogin = (provider: string) => {
    toast({
      title: `${provider} Login`,
      description: `${provider} login would be implemented with actual OAuth`,
    });
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
        <Tabs defaultValue="login" onValueChange={setActiveTab}>
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
                  />
                </div>
              </div>
              <Button className="w-full gradient-purple" type="submit">
                Log In
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
                  />
                </div>
              </div>
              <Button className="w-full gradient-purple" type="submit">
                Register
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
              onClick={() => handleSocialLogin('Google')}
            >
              <Mail className="mr-2 h-4 w-4" />
              Google
            </Button>
            <Button 
              variant="outline" 
              type="button" 
              className="flex items-center justify-center"
              onClick={() => handleSocialLogin('Discord')}
            >
              <GithubIcon className="mr-2 h-4 w-4" />
              Discord
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center text-sm">
        {activeTab === 'login' ? (
          <p>Don't have an account? <span className="text-empowerfit-purple font-semibold cursor-pointer">Register</span></p>
        ) : (
          <p>Already have an account? <span className="text-empowerfit-purple font-semibold cursor-pointer">Login</span></p>
        )}
      </CardFooter>
    </Card>
  );
};

export default AuthForm;

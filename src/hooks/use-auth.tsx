
import { useState, useEffect, createContext, useContext } from 'react';
import { supabase, isUsingRealSupabaseCredentials } from '@/lib/supabase-client'; 
import { Session, User } from '@supabase/supabase-js';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signUp: (email: string, password: string) => Promise<{
    error: Error | null;
    data: any;
  }>;
  signIn: (email: string, password: string) => Promise<{
    error: Error | null;
    data: any;
  }>;
  signInWithGoogle: () => Promise<void>;
  signInWithDiscord: () => Promise<void>;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
  isConfigured: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const isConfigured = isUsingRealSupabaseCredentials();

  useEffect(() => {
    if (!isConfigured) {
      setIsLoading(false);
      return;
    }

    const setData = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error(error);
          toast({
            title: "Authentication Error",
            description: "Failed to get session. Please check Supabase configuration.",
            variant: "destructive",
          });
        }

        setSession(session);
        setUser(session?.user ?? null);
      } catch (error) {
        console.error("Error getting session:", error);
      } finally {
        setIsLoading(false);
      }
    };

    let subscription: { unsubscribe: () => void } = { unsubscribe: () => {} };
    
    try {
      const { data } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setIsLoading(false);
      });
      
      subscription = data.subscription;
    } catch (error) {
      console.error("Error setting up auth state change listener:", error);
      setIsLoading(false);
    }

    setData();

    return () => {
      subscription.unsubscribe();
    };
  }, [toast, isConfigured]);

  const signUp = async (email: string, password: string) => {
    if (!isConfigured) {
      return {
        error: new Error("Supabase is not properly configured"),
        data: null
      };
    }

    try {
      const response = await supabase.auth.signUp({
        email,
        password,
      });
      
      return {
        error: response.error,
        data: response.data
      };
    } catch (error: any) {
      return {
        error,
        data: null
      };
    }
  };

  const signIn = async (email: string, password: string) => {
    if (!isConfigured) {
      return {
        error: new Error("Supabase is not properly configured"),
        data: null
      };
    }

    try {
      const response = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      return {
        error: response.error,
        data: response.data
      };
    } catch (error: any) {
      return {
        error,
        data: null
      };
    }
  };

  const signInWithGoogle = async () => {
    if (!isConfigured) {
      toast({
        title: "Configuration Error",
        description: "Supabase is not properly configured. Please set up your environment variables.",
        variant: "destructive",
      });
      return;
    }

    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      }
    });
  };

  const signInWithDiscord = async () => {
    if (!isConfigured) {
      toast({
        title: "Configuration Error",
        description: "Supabase is not properly configured. Please set up your environment variables.",
        variant: "destructive",
      });
      return;
    }

    await supabase.auth.signInWithOAuth({
      provider: 'discord',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      }
    });
  };

  const signOut = async () => {
    if (!isConfigured) return;
    await supabase.auth.signOut();
  };

  const value = {
    user,
    session,
    isLoading,
    signUp,
    signIn,
    signInWithGoogle,
    signInWithDiscord,
    signOut,
    isAuthenticated: !!user,
    isConfigured,
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

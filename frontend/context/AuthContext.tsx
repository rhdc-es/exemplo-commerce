'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import * as authService from '../services/authService';

export interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextValue {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  signIn: async () => {},
  signOut: () => {}
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const current = authService.getCurrentUser();
    if (current) setUser(current.user);
  }, []);

  const signIn = async (email: string, password: string) => {
    const result = await authService.signIn(email, password);
    setUser(result.user);
  };

  const signOut = () => {
    authService.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

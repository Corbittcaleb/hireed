'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthContextType } from '@/types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check for stored user data on mount
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        localStorage.removeItem('user');
        setError('Failed to load user data');
      }
    }
    setIsLoading(false);
  }, []);

  const clearError = () => setError(null);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);

      // For MVP, we'll use a mock login
      // In a real app, this would be an API call
      if (email === 'test@ou.edu' && password === 'password') {
        const mockUser: User = {
          id: 'user1',
          name: 'Test User',
          email: 'test@ou.edu',
          major: 'Computer Science',
          photo: '/images/profile1.jpg'
        };
        setUser(mockUser);
        localStorage.setItem('user', JSON.stringify(mockUser));
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to login');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    try {
      setUser(null);
      localStorage.removeItem('user');
    } catch (err) {
      setError('Failed to logout');
    }
  };

  const register = async (userData: Omit<User, 'id'> & { password: string }) => {
    try {
      setIsLoading(true);
      setError(null);

      // For MVP, we'll use a mock registration
      // In a real app, this would be an API call
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        name: userData.name,
        email: userData.email,
        major: userData.major,
        photo: userData.photo
      };
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to register');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, error, login, logout, register, clearError }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 
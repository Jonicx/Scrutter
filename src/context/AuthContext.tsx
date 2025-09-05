import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'user' | 'organizer' | 'admin';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
  setUserRole: (role: 'user' | 'organizer' | 'admin') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string) => {
    // Dummy login logic
    const dummyUser: User = {
      id: 'user_123',
      name: 'John Doe',
      email: 'Jonny@gmail.com',
      role: 'user',
      password: 'password123'
    };
    setUser(dummyUser);
  };

  const logout = () => {
    setUser(null);
  };

  const setUserRole = (role: 'user' | 'organizer' | 'admin') => {
    if (user) {
      setUser({ ...user, role });
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    setUserRole
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
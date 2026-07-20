import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  name: string;
  email: string;
  password?: string;
}

interface AuthContextType {
  currentUser: User | null;
  register: (user: User) => Promise<{ success: boolean; message: string }>;
  login: (credentials: Omit<User, 'name'>) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Initialize: load currently logged-in user
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        setCurrentUser(JSON.parse(storedUser));
      }
    } catch (e) {
      console.error('Error parsing stored user', e);
    } finally {
      setLoading(false);
    }
  }, []);

  // Register simulation
  const register = async (newUser: User): Promise<{ success: boolean; message: string }> => {
    // Basic verification delays (simulate network latency)
    await new Promise((resolve) => setTimeout(resolve, 600));

    try {
      const users: User[] = JSON.parse(localStorage.getItem('registered_users') || '[]');
      
      const emailExists = users.some((u) => u.email.toLowerCase() === newUser.email.toLowerCase());
      if (emailExists) {
        return { success: false, message: 'An account with this email already exists.' };
      }

      users.push(newUser);
      localStorage.setItem('registered_users', JSON.stringify(users));
      
      // Auto-login after registration
      const sessionUser = { name: newUser.name, email: newUser.email };
      localStorage.setItem('currentUser', JSON.stringify(sessionUser));
      setCurrentUser(sessionUser);

      return { success: true, message: 'Account registered successfully!' };
    } catch (e) {
      return { success: false, message: 'An error occurred during registration.' };
    }
  };

  // Login simulation
  const login = async (credentials: Omit<User, 'name'>): Promise<{ success: boolean; message: string }> => {
    await new Promise((resolve) => setTimeout(resolve, 600));

    try {
      const users: User[] = JSON.parse(localStorage.getItem('registered_users') || '[]');
      
      const foundUser = users.find(
        (u) =>
          u.email.toLowerCase() === credentials.email.toLowerCase() &&
          u.password === credentials.password
      );

      if (!foundUser) {
        return { success: false, message: 'Invalid email or password.' };
      }

      const sessionUser = { name: foundUser.name, email: foundUser.email };
      localStorage.setItem('currentUser', JSON.stringify(sessionUser));
      setCurrentUser(sessionUser);

      return { success: true, message: 'Logged in successfully!' };
    } catch (e) {
      return { success: false, message: 'An error occurred during login.' };
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, register, login, logout, loading }}>
      {children}
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

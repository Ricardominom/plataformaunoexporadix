import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types/user';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  hasShownWelcome: boolean;
  setHasShownWelcome: (value: boolean) => void;
  isAuthenticated: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [hasShownWelcome, setHasShownWelcome] = useState(false);

  const login = async (email: string, password: string): Promise<boolean> => {
    const API_URL = 'http://127.0.0.1:8000/auth/api/token/';
    const USER_INFO_URL = 'http://127.0.0.1:8000/auth/user-info/';
    
    try {
      // Solicita el token
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: email, password }),
      });

      if (!response.ok) {
        console.error('Error al iniciar sesión:', response.statusText);
        return false;
      }

      const data = await response.json();
      const accessToken = data.access;
      const refreshToken = data.refresh;

      // Almacena los tokens
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      // Obtiene datos del usuario
      const userResponse = await fetch(USER_INFO_URL, {
        method: 'GET',
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (!userResponse.ok) {
        console.error('Error al obtener datos del usuario:', userResponse.statusText);
        return false;
      }

      const userData = await userResponse.json();
      setUser({
        id: userData.id.toString(),
        name: userData.username,
        email: userData.email,
      });

      setHasShownWelcome(false); // Reinicia el mensaje de bienvenida
      return true;
    } catch (error) {
      console.error('Error en la autenticación:', error);
      return false;
    }
  };

  const logout = (): void => {
    setUser(null);
    setHasShownWelcome(false);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  };

  const isAuthenticated = (): boolean => {
    return !!localStorage.getItem('accessToken');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, hasShownWelcome, setHasShownWelcome, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider');
  }
  return context;
};

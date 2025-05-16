import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types/user';
import { loginApi } from '../services/api'; // Import the mock login API

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    hasShownWelcome: boolean;
    setHasShownWelcome: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });
    const [hasShownWelcome, setHasShownWelcome] = useState(false);

    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    const login = async (email: string, password: string): Promise<boolean> => {
        try {
            // Call the mock login API
            const response = await loginApi(email, password);
            const { token, user: userData } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(userData));
            setUser(userData);
            setHasShownWelcome(false);
            return true;
        } catch (error: any) {
            // Opcional: puedes devolver el mensaje del backend si existe
            // Ejemplo: error.response?.data?.message
            return false;
        }
    };

    const logout = () => {
        setUser(null);
        setHasShownWelcome(false);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, hasShownWelcome, setHasShownWelcome }}>
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
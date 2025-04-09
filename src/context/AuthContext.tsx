import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types/user';
import { users } from '../data/users';

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    hasShownWelcome: boolean;
    setHasShownWelcome: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [hasShownWelcome, setHasShownWelcome] = useState(false);

    const login = async (email: string, password: string) => {
        const foundUser = users.find(u => u.email === email && u.password === password);
        if (foundUser) {
            const { password: _, email: __, ...userWithoutCredentials } = foundUser;
            setUser(userWithoutCredentials);
            setHasShownWelcome(false); // Reset welcome message flag on new login
            return true;
        }
        return false;
    };

    const logout = () => {
        setUser(null);
        setHasShownWelcome(false); // Reset welcome message flag on logout
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

import React, { createContext, useState, useEffect, ReactNode, useContext, useCallback } from 'react';
import { getUserData, loginUser, registerUser, logoutUser } from '../api/auth';

interface AuthContextState {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string, confirmPassword: string) => Promise<void>;
    logout: () => Promise<void>;
    loading: boolean;
    error: string | null;
}

interface User {
    id: number;
    name: string;
    email: string;
}

const defaultAuthContextState: AuthContextState = {
    user: null,
    login: async () => { },
    register: async () => { },
    logout: async () => { },
    loading: true,
    error: null,
};

const AuthContext = createContext<AuthContextState>(defaultAuthContextState);

const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
    children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchUser = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const userData = await getUserData();
            setUser(userData);
        } catch (error) {
            setUser(null);
            setError('Failed to fetch user information.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    const handleLogin = async (email: string, password: string) => {
        setLoading(true);
        setError(null);
        try {
            await loginUser(email, password);
            await fetchUser();
        } catch (error) {
            setError('Login failed. Please check your credentials and try again.');
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async (name: string, email: string, password: string, confirmPassword: string) => {
        setLoading(true);
        setError(null);
        try {
            await registerUser(name, email, password, confirmPassword);
            await fetchUser();
        } catch (error) {
            setError('Registration failed. Please try again.');
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        setLoading(true);
        setError(null);
        try {
            await logoutUser();
            setUser(null);
        } catch (error) {
            setError('Logout failed. Please try again.');
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login: handleLogin, register: handleRegister, logout: handleLogout, loading, error }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, useAuth };

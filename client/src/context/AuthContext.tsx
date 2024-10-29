import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import UserApi from '../apis/UserApi';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

type User = {
    token: string | null;
    id: number,
    isManager: boolean
}
type loginType = {
    email: string,
    password: string
}

type AuthContextType = {
    user: User | null;
    login: (credentials: loginType) => Promise<boolean | void>;
    logout: () => void;
    isAuthenticated: boolean;
    isManager: boolean
}
interface UserJwtPayload extends JwtPayload {
    id: number,
    isManager: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate()
    const token = localStorage.getItem('token');
    useEffect(() => {
        if (token) {
            const decodedToken: UserJwtPayload = jwtDecode(token);
            setUser({ token, id: decodedToken.id, isManager: decodedToken.isManager });
        } else {
            navigate('/login')
        }
    }, [token]);

    const login = async (credentials: loginType) => {
        try {
            const [error, data] = await UserApi.logIn(credentials);
            if (data) {
                const decodedToken: UserJwtPayload = jwtDecode(data.data)
                if (decodedToken) {
                    setUser({ token: data.token, id: decodedToken.id, isManager: data.isManager });
                    localStorage.setItem('token', data.data);
                    navigate('/')
                }
            }
        } catch (error) {
            console.error("Login failed", error);
        }
    };
    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
    };
    const isAuthenticated = Boolean(user && user?.token);
    const isManager = (user && user?.isManager) ?? false;
    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated, isManager }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType | undefined => {
    const context = useContext(AuthContext);
    if (!context) {
        console.error('useAuth must be used within an AuthProvider')
    }
    return context;
};

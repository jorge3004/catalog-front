import React, { createContext, useContext } from 'react';
import { useAuthLogic } from '../hooks/auth/useAuthLogic';
import { SESSION_REASONS } from '../constants/auth/types';

export const AuthContext = createContext();

export function AuthProvider({ children, ...rest }) {
    const auth = useAuthLogic();

    return (
        <AuthContext.Provider value={{ ...auth, SESSION_REASONS, ...rest }}>
            {children}
        </AuthContext.Provider>
    );
}

// Hook para consumir el contexto de autenticación
export function useAuth() {
    return useContext(AuthContext);
}

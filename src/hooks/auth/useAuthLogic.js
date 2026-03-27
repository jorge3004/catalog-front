// Lógica modularizada de autenticación
import { useState, useEffect } from 'react';
import { clearLocalStorageExcept, setUserLocalStorage } from '../../utils/auth/authHelpers';
import useApplyUserSession from './useApplyUserSession';

// Auxiliar: cargar usuario desde localStorage
function getUserFromLocalStorage() {
    const stored = localStorage.getItem('user');
    if (stored) {
        try { return JSON.parse(stored); } catch { return null; }
    }
    return null;
}

// Auxiliar: obtener usuario desde API
async function fetchUserFromApi(apiUrl, token) {
    const res = await fetch(apiUrl + '/users/me', {
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('invalid-token');
    const data = await res.json();
    return data.user;
}


export function useAuthLogic() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [apiError, setApiError] = useState(false);
    const [apiErrorMsg, setApiErrorMsg] = useState('');
    const [hasSession, setHasSession] = useState(false);
    const [sessionReason, setSessionReason] = useState(null); // 'no-token', 'invalid-token', 'expired-token', null
    const [sessionSource, setSessionSource] = useState(null); // 'login' | 'localStorage' | null

    // Pasar setters explícitos para evitar ciclo de contexto
    const { applyUserSession, clearUserSession } = useApplyUserSession({
        setUser,
        setHasSession,
        setSessionReason,
        setSessionSource,
    });

    useEffect(() => {
        // Si la sesión fue iniciada por login, no validar con la API en este render
        if (sessionSource === 'login') {
            setLoading(false);
            return;
        }
        const apiUrl = process.env.REACT_APP_API_URL;
        if (!apiUrl) {
            setApiError(true);
            setApiErrorMsg('No server URL configured. Please contact the administrator.');
            setLoading(false);
            return;
        }
        fetch(apiUrl + '/health')
            .then(async (res) => {
                if (!res.ok) {
                    setApiError(true);
                    setApiErrorMsg('Server is not responding correctly. Please contact the administrator.');
                    setLoading(false);
                    return;
                }
                const token = localStorage.getItem('token');
                if (token) {
                    try {
                        const user = await fetchUserFromApi(apiUrl, token);
                        applyUserSession(user, 'token');
                    } catch (err) {
                        clearUserSession();
                        setSessionReason('invalid-token');
                    }
                } else {
                    clearUserSession();
                    setSessionReason('no-token');
                }
                setLoading(false);
            })
            .catch(() => {
                setApiError(true);
                setApiErrorMsg('Could not connect to the server. Please check your connection or contact the administrator.');
                setLoading(false);
            });
    }, [sessionSource]);

    return {
        user,
        setUser,
        setHasSession,
        loading,
        apiError,
        apiErrorMsg,
        hasSession,
        sessionReason,
        sessionSource,
        setSessionSource,
    };
}
// Lógica modularizada de autenticación
import { useState, useEffect } from 'react';
import { clearLocalStorageExcept, setUserLocalStorage } from '../../utils/auth/authHelpers';

export function useAuthLogic() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [apiError, setApiError] = useState(false);
    const [apiErrorMsg, setApiErrorMsg] = useState('');
    const [hasSession, setHasSession] = useState(false);
    const [sessionReason, setSessionReason] = useState(null); // 'no-token', 'invalid-token', 'expired-token', null

    useEffect(() => {
        const apiUrl = process.env.REACT_APP_API_URL;
        if (!apiUrl) {
            setApiError(true);
            setApiErrorMsg('No server URL configured. Please contact the administrator.');
            setLoading(false);
            return;
        }
        fetch(apiUrl + '/health')
            .then((res) => {
                if (!res.ok) {
                    setApiError(true);
                    setApiErrorMsg('Server is not responding correctly. Please contact the administrator.');
                    setLoading(false);
                } else {
                    const token = localStorage.getItem('token');
                    if (token) {
                        fetch(apiUrl + '/users/me', {
                            headers: { Authorization: `Bearer ${token}` },
                        })
                            .then(async (res) => {
                                if (res.status === 401) {
                                    setUser(false);
                                    setHasSession(false);
                                    setSessionReason('invalid-token');
                                    clearLocalStorageExcept(['lang', 'theme']);
                                    setLoading(false);
                                    return;
                                }
                                const data = await res.json().catch(() => null);
                                if (data && data.user) {
                                    setUser(data.user);
                                    setUserLocalStorage(data.user);
                                    setHasSession(true);
                                    setSessionReason(null);
                                } else {
                                    setUser(false);
                                    setHasSession(false);
                                    setSessionReason('invalid-token');
                                }
                                setLoading(false);
                            })
                            .catch(() => {
                                setUser(false);
                                setHasSession(false);
                                setSessionReason('invalid-token');
                                clearLocalStorageExcept(['lang', 'theme']);
                                setLoading(false);
                            });
                    } else {
                        setUser(false);
                        setHasSession(false);
                        setSessionReason('no-token');
                        clearLocalStorageExcept(['lang', 'theme']);
                        setLoading(false);
                    }
                }
            })
            .catch(() => {
                setApiError(true);
                setApiErrorMsg('Could not connect to the server. Please check your connection or contact the administrator.');
                setLoading(false);
            });
    }, []);

    return {
        user,
        setUser,
        loading,
        apiError,
        apiErrorMsg,
        hasSession,
        sessionReason,
    };
}
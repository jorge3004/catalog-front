import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { loginUser } from '../api/userApi';

export default function useLogin() {
    const { t } = useTranslation();
    const { setUser } = useAuth();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const result = await loginUser({ username, password });
            const { ok, status, data } = result;
            if (!ok || data.success === false) {
                if (data && data.message) {
                    setError(data.message);
                } else if (status === 401) {
                    setError(t('login.invalidCredentials', 'Credenciales incorrectas'));
                } else {
                    setError(t('login.error', 'Error al iniciar sesión'));
                }
                setLoading(false);
                return;
            }
            setUser(data.user);
            if (data.user && data.user.language) {
                const currentLang = localStorage.getItem('lang');
                if (!currentLang || currentLang !== data.user.language) {
                    localStorage.setItem('lang', data.user.language);
                }
                const i18n = require('../i18n').default;
                i18n.changeLanguage(data.user.language);
            }
            if (data.user && data.user.theme) {
                const currentTheme = localStorage.getItem('theme');
                if (!currentTheme || currentTheme !== data.user.theme) {
                    localStorage.setItem('theme', data.user.theme);
                }
            }
            if (data.token) {
                localStorage.setItem('token', data.token);
            }
            if (data.user) {
                localStorage.setItem('user', JSON.stringify(data.user));
            }
            setLoading(false);
            let route = data.user && data.user.last_route ? data.user.last_route : '/dashboard/catalog';
            // Normaliza para que siempre empiece con '/'
            if (!route.startsWith('/')) {
                route = '/' + route;
            }
            window.location.href = route;
        } catch (err) {
            setError(t('login.error', 'Error al iniciar sesión'));
            setLoading(false);
        }
    };

    return {
        username,
        setUsername,
        password,
        setPassword,
        error,
        loading,
        handleSubmit,
    };
}

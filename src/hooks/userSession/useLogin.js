import { useState } from 'react';
import userService from '../../services/userService';
import { useNavigate } from 'react-router-dom';
import { validateDashboardRoute } from '../../utils/route/validateDashboardRoute';
import useSessionManager from '../auth/useSessionManager';

const useLogin = () => {
    const { startSession } = useSessionManager();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();


    const login = async (username, password) => {
        setLoading(true);
        setError(null);
        try {
            const result = await userService.login(username, password);
            if (result && result.user) {
                startSession(result.user);
                // Redirigir a la ruta last_route válida recibida del backend
                const target = validateDashboardRoute(result.user.last_route);
                navigate(target, { replace: true });
                return result.user;
            } else {
                setError('Respuesta inválida del servidor');
                return null;
            }
        } catch (err) {
            setError(err.message || 'Error al iniciar sesión');
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { login, loading, error };
};

export default useLogin;

import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import userService from '../../services/userService';

const useLogin = () => {
    const { setUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const login = async (username, password) => {
        setLoading(true);
        setError(null);
        try {
            const result = await userService.login(username, password);
            if (result && result.user) {
                setUser(result.user);
                // Forzar recarga para que AuthProvider detecte el nuevo token y usuario
                window.location.reload();
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

import { useAuth } from '../../context/AuthProvider';
import { setUserLocalStorage, clearLocalStorageExcept } from '../../utils/auth/authHelpers';

// Hook centralizado para gestionar la sesión de usuario
export default function useSessionManager() {
    const { setUser, setHasSession, setSessionSource } = useAuth();

    // Iniciar sesión: actualiza contexto y localStorage
    function startSession(user) {
        // Filtrar last_route antes de guardar user
        const { last_route, ...userWithoutLastRoute } = user;
        setUserLocalStorage(userWithoutLastRoute);
        setUser(userWithoutLastRoute);
        setHasSession(true);
        setSessionSource('login');
        // Inicializar/actualizar last_route siempre al iniciar sesión
        localStorage.setItem('last_route', user.last_route || '/dashboard');
    }

    // Cerrar sesión: limpia contexto y localStorage
    function endSession() {
        setUser(null);
        setHasSession(false);
        setSessionSource(null);
        clearLocalStorageExcept(['lang', 'theme']);
    }

    return { startSession, endSession };
}

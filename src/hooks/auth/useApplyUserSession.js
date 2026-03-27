// Hook/utilidad para centralizar la activación y desactivación de sesión de usuario
import { useAuth } from '../../context/AuthProvider';
import { setUserLocalStorage, clearLocalStorageExcept } from '../../utils/auth/authHelpers';

// Permite usar setters externos (para evitar ciclo en AuthProvider) o contexto por defecto
export default function useApplyUserSession(
    setters = null
) {
    // Si se pasan setters explícitos, úsalos; si no, usa el contexto
    const context = useAuth();
    const {
        setUser,
        setHasSession,
        setSessionReason,
        setSessionSource
    } = setters || context || {};

    // Activa la sesión de usuario
    function applyUserSession(user, source = 'token') {
        if (!setUser || !setHasSession || !setSessionReason || !setSessionSource) return;
        setUser(user);
        setUserLocalStorage(user);
        setHasSession(true);
        setSessionReason(null);
        setSessionSource(source);
    }

    // Desactiva la sesión de usuario
    function clearUserSession() {
        if (!setUser || !setHasSession || !setSessionReason || !setSessionSource) return;
        setUser(null);
        setHasSession(false);
        setSessionReason('no-token');
        setSessionSource(null);
        clearLocalStorageExcept(['lang', 'theme']);
    }

    return { applyUserSession, clearUserSession };
}

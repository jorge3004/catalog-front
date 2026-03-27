import { useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';
import { validateDashboardRoute } from '../../utils/route/validateDashboardRoute';

// Hook simple para redirección basada en sesión y last_route
export default function useSimpleAuthRedirect() {
    const { user, hasSession, sessionReason } = useAuth();
    const location = useLocation();

    // Rutas públicas
    const PUBLIC_ROUTES = ['/login', '/register', '/forgot'];

    // Si no hay sesión y no estamos en rutas públicas, redirigir a login
    if (
        hasSession === false &&
        !PUBLIC_ROUTES.some((p) => location.pathname.startsWith(p))
    ) {
        let reason = '';
        if (sessionReason === 'invalid-token') reason = 'invalid';
        else if (sessionReason === 'no-token') reason = 'none';
        const url = reason ? `/login?session=${reason}` : '/login';
        return <Navigate to={url} replace />;
    }

    // Si hay sesión y el usuario intenta acceder manualmente a /login, /register, /forgot, redirigir a last_route o dashboard
    if (
        hasSession === true &&
        PUBLIC_ROUTES.some((p) => location.pathname.startsWith(p))
    ) {
        // Usar solo la clave raíz de localStorage para last_route
        let lastRoute = localStorage.getItem('last_route') || '/dashboard';
        const target = validateDashboardRoute(lastRoute) || '/dashboard';
        if (location.pathname !== target) {
            return <Navigate to={target} replace />;
        }
    }

    // Si hay sesión y está fuera de /dashboard y rutas públicas, redirigir a /dashboard
    if (
        hasSession === true &&
        !location.pathname.startsWith('/dashboard') &&
        !PUBLIC_ROUTES.some((p) => location.pathname.startsWith(p))
    ) {
        return <Navigate to="/dashboard" replace />;
    }

    return null;
}

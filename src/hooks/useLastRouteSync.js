
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { updateLastRoute } from '../api/lastRouteApi';

export default function useLastRouteSync() {
    const location = useLocation();
    const { user, setUser } = useAuth();
    // Mantener para evitar PATCH innecesario tras refresh
    const lastRouteRef = useRef(location.pathname);

    useEffect(() => {
        if (user && user.id && location.pathname !== '/login') {
            const token = localStorage.getItem('token');
            if (lastRouteRef.current !== location.pathname) {
                updateLastRoute({ userId: user.id, last_route: location.pathname, token })
                    .then(() => {
                        // Actualiza user en contexto y localStorage
                        const updatedUser = { ...user, last_route: location.pathname };
                        setUser(updatedUser);
                        localStorage.setItem('user', JSON.stringify(updatedUser));
                    })
                    .catch(() => { });
                lastRouteRef.current = location.pathname;
            }
        }
    }, [location.pathname, user, setUser]);
}

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import { updateLastRoute } from '../../api/userApi';

const useLastRouteSync = () => {
    const location = useLocation();
    const { user } = useContext(AuthContext);
    useEffect(() => {
        if (user && user.id) {
            const prev = localStorage.getItem('lastRoute');
            if (prev !== location.pathname) {
                localStorage.setItem('lastRoute', location.pathname);
                if (localStorage.getItem('token')) {
                    updateLastRoute({ userId: user.id, lastRoute: location.pathname, token: localStorage.getItem('token') });
                }
            }
        }
    }, [location.pathname, user]);
};

export default useLastRouteSync;

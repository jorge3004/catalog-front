import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useLastRouteSync = () => {
    const location = useLocation();

    useEffect(() => {
        localStorage.setItem('lastRoute', location.pathname);
    }, [location]);
};

export default useLastRouteSync;

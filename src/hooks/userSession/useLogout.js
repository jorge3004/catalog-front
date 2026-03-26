import { useAuth } from '../../context/AuthProvider';
import { clearLocalStorageExcept } from '../../utils/auth/authHelpers';

const useLogout = () => {
  const { setUser } = useAuth();
  return () => {
    // Preservar lang y theme
    localStorage.removeItem('lastRoute');
    clearLocalStorageExcept(['lang', 'theme']);
    setUser(null);
    window.location.href = '/login';
  };
};

export default useLogout;

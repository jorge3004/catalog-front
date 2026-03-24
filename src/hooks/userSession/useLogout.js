import { useAuth } from '../../context/AuthProvider';

const useLogout = () => {
  const { setUser } = useAuth();
  return () => {
    // Preservar lang y theme
    const lang = localStorage.getItem('lang');
    const theme = localStorage.getItem('theme');
    localStorage.removeItem('lastRoute');
    localStorage.clear();
    if (lang) localStorage.setItem('lang', lang);
    if (theme) localStorage.setItem('theme', theme);
    setUser(null);
    window.location.href = '/login';
  };
};

export default useLogout;

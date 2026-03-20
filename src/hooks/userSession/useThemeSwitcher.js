import { useState, useEffect } from 'react';




const useThemeSwitcher = () => {
    // Solo exponer y manejar 'light'/'dark' externamente
    const validThemes = ['light', 'dark'];
    let initialTheme = localStorage.getItem('theme');
    if (!validThemes.includes(initialTheme)) {
        initialTheme = 'light';
    }
    const [theme, setTheme] = useState(initialTheme);

    useEffect(() => {
        localStorage.setItem('theme', theme);
        document.body.setAttribute('data-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    return { theme, toggleTheme };
};

export default useThemeSwitcher;

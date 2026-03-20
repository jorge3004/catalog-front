import { useState, useEffect } from 'react';


const useThemeSwitcher = () => {
    // Usar 'merisa' y 'merisaDark' para los temas definidos en theme.js
    const validThemes = ['merisa', 'merisaDark'];
    let initialTheme = localStorage.getItem('theme');
    if (!validThemes.includes(initialTheme)) {
        initialTheme = 'merisa';
    }
    const [theme, setTheme] = useState(initialTheme);

    useEffect(() => {
        localStorage.setItem('theme', theme);
        document.body.setAttribute('data-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'merisa' ? 'merisaDark' : 'merisa'));
    };

    return { theme, toggleTheme };
};

export default useThemeSwitcher;

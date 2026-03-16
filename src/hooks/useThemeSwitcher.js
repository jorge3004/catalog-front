import { useState, useEffect, useCallback } from 'react';

const THEME_KEY = 'theme';

function mapTheme(theme) {
    if (theme === 'dark') return 'merisaDark';
    return 'merisa'; // default y 'light'
}

export default function useThemeSwitcher() {
    let storedTheme = localStorage.getItem(THEME_KEY); // 'light' | 'dark' | null
    let initialTheme;
    if (storedTheme === 'light' || storedTheme === 'dark') {
        initialTheme = mapTheme(storedTheme);
    } else {
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        initialTheme = prefersDark ? 'merisaDark' : 'merisa';
    }

    const [themeName, setThemeName] = useState(initialTheme);

    useEffect(() => {
        // Guardar en localStorage como 'light' o 'dark'
        if (themeName === 'merisaDark') {
            localStorage.setItem(THEME_KEY, 'dark');
        } else {
            localStorage.setItem(THEME_KEY, 'light');
        }
    }, [themeName]);

    const handleThemeChange = useCallback((newTheme) => {
        setThemeName(newTheme);
        // localStorage se actualiza por el useEffect
    }, []);

    return { themeName, setThemeName: handleThemeChange };
}

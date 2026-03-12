import React, { useState, useEffect } from 'react';

import { ThemeProvider, CssBaseline } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { themes } from './theme';
import AppWithAuthLoader from './AppWithAuthLoader';
import { AuthProvider } from './context/AuthContext';
import './i18n';
import { useTranslation } from 'react-i18next';
import useLastRouteSync from './hooks/useLastRouteSync';
import './global.css';


function LastRouteSyncWrapper({ children }) {
    useLastRouteSync();
    return children;
}

function App() {
    // Detectar tema preferido: localStorage ('light'|'dark') > navegador > default
    function mapTheme(theme) {
        if (theme === 'dark') return 'merisaDark';
        return 'merisa'; // default y 'light'
    }

    let storedTheme = localStorage.getItem('theme'); // 'light' | 'dark' | null
    let initialTheme;
    if (storedTheme === 'light' || storedTheme === 'dark') {
        initialTheme = mapTheme(storedTheme);
    } else {
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        initialTheme = prefersDark ? 'merisaDark' : 'merisa';
    }
    const [themeName, setThemeName] = useState(initialTheme);
    const { i18n } = useTranslation();

    useEffect(() => {
        if (i18n.language === 'en') {
            document.title = 'Hospital Equipment Catalog';
        } else {
            document.title = 'Catálogo de Aparatos Hospitalarios';
        }
    }, [i18n.language]);



    return (
        <ThemeProvider theme={themes[themeName]}>
            <CssBaseline />
            <AuthProvider>
                <BrowserRouter>
                    <LastRouteSyncWrapper>
                        <AppWithAuthLoader />
                    </LastRouteSyncWrapper>
                </BrowserRouter>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;

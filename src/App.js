import React, { useEffect } from 'react';

import { ThemeProvider, CssBaseline } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { themes } from './theme';
import AppWithAuthLoader from './AppWithAuthLoader';
import { AuthProvider } from './context/AuthContext';
import './i18n';
import { useTranslation } from 'react-i18next';
import './global.css';
import useThemeSwitcher from './hooks/userSession/useThemeSwitcher';
import useLastRouteSync from './hooks/userSession/useLastRouteSync';


function LastRouteSyncWrapper({ children }) {
    useLastRouteSync();
    return children;
}

function App() {
    // Detectar tema preferido: localStorage ('light'|'dark') > navegador > default
    const { theme, toggleTheme } = useThemeSwitcher();
    const { i18n } = useTranslation();

    useEffect(() => {
        if (i18n.language === 'en') {
            document.title = 'Hospital Equipment Catalog';
        } else {
            document.title = 'Catálogo de Aparatos Hospitalarios';
        }
    }, [i18n.language]);



    return (
        <ThemeProvider theme={themes[theme]}>
            <CssBaseline />
            <AuthProvider>
                <BrowserRouter>
                    <LastRouteSyncWrapper>
                        <AppWithAuthLoader
                            theme={theme}
                            toggleTheme={toggleTheme}
                        />
                    </LastRouteSyncWrapper>
                </BrowserRouter>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;

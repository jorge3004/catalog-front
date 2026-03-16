import React, { useEffect } from 'react';

import { ThemeProvider, CssBaseline } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { themes } from './theme';
import useThemeSwitcher from './hooks/useThemeSwitcher';
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
    const { themeName, setThemeName } = useThemeSwitcher();
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
                        <AppWithAuthLoader
                            themeName={themeName}
                            onThemeChange={setThemeName}
                        />
                    </LastRouteSyncWrapper>
                </BrowserRouter>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;


import React, { useState, useEffect } from 'react';
import { ThemeProvider, CssBaseline, Button, Box } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';

import { themes } from './theme';
import AppRoutes from './routes/AppRoutes';
import './i18n';
import { useTranslation } from 'react-i18next';


function App() {
    const [themeName, setThemeName] = useState('default');
    const { i18n } = useTranslation();

    useEffect(() => {
        if (i18n.language === 'en') {
            document.title = 'Hospital Equipment Catalog';
        } else {
            document.title = 'Catálogo de Aparatos Hospitalarios';
        }
    }, [i18n.language]);

    const handleToggleTheme = () => {
        setThemeName((prev) => (prev === 'default' ? 'alt' : 'default'));
    };

    return (
        <ThemeProvider theme={themes[themeName]}>
            <CssBaseline />
            <BrowserRouter>
                <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
                    <Button variant="contained" color="secondary" onClick={handleToggleTheme}>
                        {themeName === 'default' ? 'Tema Alternativo' : 'Tema Merisa'}
                    </Button>
                </Box>
                <AppRoutes />
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;

import { createTheme } from '@mui/material/styles';


// Paleta fiel a https://merisa.mx/
const merisaPalette = {
    primary: {
        main: '#1e2a36', // Azul oscuro principal
        contrastText: '#fff',
    },
    secondary: {
        main: '#223047', // Azul más claro para acentos
        contrastText: '#fff',
    },
    background: {
        default: '#f5f6fa', // Fondo general
        paper: '#fff',
    },
    text: {
        primary: '#1e2a36', // Azul oscuro para textos principales
        secondary: '#6c757d', // Gris medio para textos secundarios
    },
    divider: '#e0e3e7', // Gris claro para divisores
    info: {
        main: '#2b3a4a', // Azul acento (hover, detalles)
        contrastText: '#fff',
    },
    error: {
        main: '#d32f2f',
    },
    warning: {
        main: '#fbc02d',
    },
    success: {
        main: '#388e3c',
    },
};

const defaultTheme = createTheme({
    palette: merisaPalette,
    typography: {
        fontFamily: 'Montserrat, Arial, sans-serif',
        h1: { fontWeight: 700 },
        h2: { fontWeight: 600 },
        h3: { fontWeight: 500 },
        button: { textTransform: 'none', fontWeight: 600 },
    },
    shape: {
        borderRadius: 12,
    },
});

const altTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: { main: '#22223b' },
        secondary: { main: '#9a8c98' },
        background: { default: '#2a2a40', paper: '#22223b' },
        text: { primary: '#fff', secondary: '#c9ada7' },
    },
    typography: {
        fontFamily: 'Montserrat, Arial, sans-serif',
    },
    shape: {
        borderRadius: 12,
    },
});

export const themes = {
    default: defaultTheme,
    alt: altTheme,
};

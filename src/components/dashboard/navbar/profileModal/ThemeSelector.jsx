import React from 'react';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme } from '@mui/material/styles';

const ThemeSelector = ({ themeName, onThemeChange }) => {

    const muiTheme = useTheme();
    const handleThemeToggle = () => {
        const newTheme = themeName === 'merisa' ? 'merisaDark' : 'merisa';
        if (onThemeChange) onThemeChange(newTheme);
    };

    return (
        <IconButton
            onClick={handleThemeToggle}
            sx={{
                color:
                    themeName === 'merisa'
                        ? '#222' // negro casi puro para tema claro
                        : '#FFD600', // amarillo brillante para tema oscuro
                backgroundColor: 'transparent',
                transition: 'color 0.2s',
            }}
            aria-label={
                themeName === 'merisa'
                    ? 'Activar modo oscuro'
                    : 'Activar modo claro'
            }
        >
            {themeName === 'merisa' ? <Brightness4Icon /> : <Brightness7Icon />}
        </IconButton>
    );
};

export default ThemeSelector;

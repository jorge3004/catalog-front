import React, { useState } from 'react';
import ProfileModal from '../profileModal/ProfileModal';
import { useTranslation } from 'react-i18next';
import {
    Menu,
    MenuItem,
    Avatar,
    Typography,
    IconButton,
    Box,
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import useLogout from '../../../../hooks/userSession/useLogout';

const UserMenu = ({
    user,
    anchorEl,
    handleMenu,
    handleClose,
    initials,
    displayName,
    theme,
    toggleTheme,
}) => {
    const { t, i18n } = useTranslation();
    const [profileOpen, setProfileOpen] = useState(false);
    const handleLogout = useLogout();

    return (
        <Box sx={{ ml: 2, display: 'flex', alignItems: 'center' }}>
            <IconButton
                onClick={handleMenu}
                color="inherit"
                size="large"
                disableRipple
                sx={{
                    p: 0,
                    borderRadius: 0,
                    backgroundColor: 'transparent',
                    transition: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    boxShadow: 'none',
                    minWidth: 'unset',
                    minHeight: 'unset',
                    '&:hover, &:focus, &:active': {
                        backgroundColor: 'transparent !important',
                        boxShadow: 'none',
                        outline: 'none',
                    },
                }}
            >
                <Avatar sx={{ width: 32, height: 32, mr: 1 }}>{initials}</Avatar>
                <Typography
                    sx={{
                        color: 'inherit',
                        fontWeight: 500,
                        textTransform: 'capitalize',
                        mr: 0.5,
                        transition: 'color 0.2s',
                        '&:hover': {
                            color: 'primary.main',
                        },
                    }}
                >
                    {displayName}
                </Typography>
                <ArrowDropDownIcon
                    sx={{
                        transition: 'color 0.2s',
                        '&:hover': {
                            color: 'primary.main',
                        },
                    }}
                />
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                <MenuItem
                    onClick={() => {
                        handleClose();
                        setProfileOpen(true);
                    }}
                >
                    {t('userMenu.profile', { defaultValue: i18n.language === 'en' ? 'Profile' : 'Perfil' })}
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                    {t('userMenu.logout', { defaultValue: i18n.language === 'en' ? 'Logout' : 'Cerrar sesión' })}
                </MenuItem>
            </Menu>
            <ProfileModal
                open={profileOpen}
                onClose={() => setProfileOpen(false)}
                theme={theme}
                toggleTheme={toggleTheme}
            />
        </Box>
    );
};

export default UserMenu;

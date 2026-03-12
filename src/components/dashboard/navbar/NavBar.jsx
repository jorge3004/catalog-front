import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Typography,
  Menu,
  MenuItem,
  Box,
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useAuth } from '../../../context/AuthContext';
import ProfileModal from './profileModal/ProfileModal';

import MenuIcon from '@mui/icons-material/Menu';

const NavBar = ({ onMenuClick, title = 'Catálogo' }) => {
  const { user, setUser } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);

  if (!user) return null;

  const initials = user.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
    : user.username
      ? user.username[0].toUpperCase()
      : '';

  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleProfile = () => {
    setProfileOpen(true);
    handleClose();
  };
  const handleLogout = () => {
    setUser(null);
    // Preservar lang y theme
    const lang = localStorage.getItem('lang');
    const theme = localStorage.getItem('theme');
    localStorage.clear();
    if (lang) localStorage.setItem('lang', lang);
    if (theme) localStorage.setItem('theme', theme);
    handleClose();
    window.location.href = '/login';
  };

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar>
        {onMenuClick && (
          <IconButton
            color="inherit"
            edge="start"
            onClick={onMenuClick}
            sx={{ mr: 2, display: { xs: 'inline-flex', sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            color: 'primary.main',
            fontWeight: 700,
            fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.5rem', lg: '1.7rem' },
            lineHeight: 1.2,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {title}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
                '& .NavBar-username, & .NavBar-arrow': {
                  color: 'primary.main',
                },
              },
            }}
          >
            <Avatar sx={{ width: 32, height: 32, mr: 1 }}>{initials}</Avatar>
            <Typography
              className="NavBar-username"
              sx={{
                color: 'inherit',
                fontWeight: 500,
                textTransform: 'capitalize',
                mr: 0.5,
                transition: 'color 0.2s',
              }}
            >
              {user.name || user.username}
            </Typography>
            <ArrowDropDownIcon
              className="NavBar-arrow"
              sx={{
                transition: 'color 0.2s',
              }}
            />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleProfile}>Perfil</MenuItem>
            <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
          </Menu>
          <ProfileModal
            open={profileOpen}
            onClose={() => setProfileOpen(false)}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;

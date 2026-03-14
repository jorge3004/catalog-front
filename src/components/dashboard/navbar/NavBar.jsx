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

import UserMenu from './UserMenu';

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
        <UserMenu
          user={user}
          anchorEl={anchorEl}
          handleMenu={handleMenu}
          handleClose={handleClose}
          handleLogout={handleLogout}
          initials={initials}
          displayName={user.name || user.username}
        />
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;

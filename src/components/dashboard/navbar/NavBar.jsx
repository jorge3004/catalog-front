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

import UserMenu from './userMenu/UserMenu';
import SearchBar from './SearchBar';
import AddCatalogButton from './AddCatalogButton';

import MenuIcon from '@mui/icons-material/Menu';

const NavBar = ({ onMenuClick, onSearch, theme, toggleTheme, onAddClick }) => {
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

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar sx={{ gap: 2 }}>
        {onMenuClick && (
          <IconButton
            color="inherit"
            edge="start"
            sx={{ mr: 2, display: { xs: 'inline-flex', sm: 'none' } }}
            onClick={onMenuClick}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
          <SearchBar onSearch={onSearch} />
          <AddCatalogButton onClick={onAddClick} />
        </Box>
        <UserMenu
          user={user}
          anchorEl={anchorEl}
          handleMenu={handleMenu}
          handleClose={handleClose}
          initials={initials}
          displayName={user.name || user.username}
          theme={theme}
          toggleTheme={toggleTheme}
        />
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;

// Archivo eliminado. Ahora está en src/layouts/DashboardLayout.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Menu, MenuItem, Avatar, Typography } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  AppBar,
  CssBaseline,
  IconButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PeopleIcon from '@mui/icons-material/People';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { Link, Outlet } from 'react-router-dom';

const drawerWidth = 220;

const menuItems = [
  { text: 'Gestor de usuarios', icon: <PeopleIcon />, path: '/users' },
  {
    text: 'Gestor de catálogo PDF',
    icon: <PictureAsPdfIcon />,
    path: '/catalog',
  },
];

const DashboardLayout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { user, setUser } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
    navigate('/login');
  };
  // Iniciales y nombre preferido del usuario para el avatar y display
  let initials = '';
  let displayName = '';
  if (user) {
    if (user.preferred_name) {
      displayName =
        user.preferred_name.charAt(0).toUpperCase() +
        user.preferred_name.slice(1);
      // Buscar apellido si existe
      if (user.last_name) {
        initials =
          user.preferred_name.charAt(0).toUpperCase() +
          user.last_name.charAt(0).toUpperCase();
      } else {
        initials = user.preferred_name.charAt(0).toUpperCase();
      }
    } else if (user.name) {
      const parts = user.name.trim().split(' ');
      displayName = parts[0];
      if (parts.length > 1) {
        initials = parts[0][0].toUpperCase() + parts[1][0].toUpperCase();
      } else {
        initials = parts[0][0].toUpperCase();
      }
    } else if (user.username) {
      displayName = user.username;
      initials = user.username.charAt(0).toUpperCase();
    }
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <List>
        {menuItems.map((item) => (
          <ListItem button key={item.text} component={Link} to={item.path}>
            <ListItemIcon sx={{ color: 'text.primary' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              primaryTypographyProps={{
                sx: {
                  color: 'text.primary',
                  fontWeight: 400,
                  letterSpacing: 0.5,
                },
              }}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Catálogo
          </Typography>
          {user && (
            <Box sx={{ ml: 2, display: 'flex', alignItems: 'center' }}>
              <IconButton
                onClick={handleMenu}
                color="inherit"
                size="large"
                sx={{
                  p: 0.5,
                  borderRadius: 2,
                  '&:hover': {
                    backgroundColor: 'rgba(0,0,0,0.04)',
                  },
                  transition: 'background-color 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Avatar sx={{ width: 32, height: 32, mr: 1 }}>
                  {initials}
                </Avatar>
                <Typography
                  sx={{
                    color: 'inherit',
                    fontWeight: 500,
                    textTransform: 'capitalize',
                    mr: 0.5,
                    transition: 'color 0.2s',
                    '.MuiIconButton-root:hover &': {
                      color: 'primary.main',
                    },
                  }}
                >
                  {displayName}
                </Typography>
                <ArrowDropDownIcon
                  sx={{
                    transition: 'color 0.2s',
                    '.MuiIconButton-root:hover &': {
                      color: 'primary.main',
                    },
                  }}
                />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Perfil</MenuItem>
                <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {/* Aquí va el contenido de la página */}
        {children || <Outlet />}
      </Box>
    </Box>
  );
};

export default DashboardLayout;

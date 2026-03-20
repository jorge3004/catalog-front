import React from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import NavBar from '../components/dashboard/navbar/NavBar';
import Sidebar from '../components/dashboard/Sidebar';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const NAVBAR_HEIGHT = 64; // Altura estándar de AppBar/Toolbar


const DashboardLayout = ({ theme, toggleTheme }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));
  const location = useLocation();

  const { t } = useTranslation();
  // Determinar título según la ruta, usando i18n
  let titleKey = 'navbar.catalog';
  if (location.pathname.startsWith('/dashboard/users')) {
    titleKey = 'navbar.users';
  } else if (location.pathname.startsWith('/dashboard/catalog')) {
    titleKey = 'navbar.catalogManager';
  } else if (location.pathname.startsWith('/dashboard')) {
    titleKey = 'navbar.dashboard';
  }
  const title = t(titleKey);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
      {/* NavBar fijo arriba */}
      <Box sx={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1201 }}>
        <NavBar
          onMenuClick={isMobile ? handleDrawerToggle : undefined}
          title={title}
          theme={theme}
          toggleTheme={toggleTheme}
        />
      </Box>
      {/* Layout principal con Sidebar y contenido, debajo del NavBar */}
      <Box sx={{ display: 'flex', flex: 1, pt: `${NAVBAR_HEIGHT}px` }}>
        {/* Sidebar solo ocupa espacio en desktop */}
        {!isMobile && (
          <Sidebar
            mobileOpen={mobileOpen}
            handleDrawerToggle={handleDrawerToggle}
          />
        )}
        <Box
          component="main"
          sx={{ flexGrow: 1, p: { xs: 1, sm: 3 }, width: '100%' }}
        >
          {/* Sidebar Drawer solo en móvil (no ocupa espacio) */}
          {isMobile && (
            <Sidebar
              mobileOpen={mobileOpen}
              handleDrawerToggle={handleDrawerToggle}
            />
          )}
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;

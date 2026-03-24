import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import UserManager from '../pages/dashboard/UserManager';
import CatalogManager from '../pages/dashboard/CatalogManager';
import { useAuth } from '../context/AuthProvider';
import DashboardLayout from '../layouts/DashboardLayout';
import DashboardHome from '../pages/dashboard/DashboardHome';
import Login from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ForgotPasswordPage from '../pages/ForgotPasswordPage';
const AppRoutes = ({ theme, toggleTheme }) => {
  const { user, hasSession, sessionReason } = useAuth();
  const location = useLocation();
  // Redirigir a /login si no hay sesión y no estamos ya en /login

  if (
    hasSession === false &&
    !['/login', '/register', '/forgot'].some((p) =>
      location.pathname.startsWith(p),
    )
  ) {
    let reason = '';
    if (sessionReason === 'invalid-token') reason = 'invalid';
    else if (sessionReason === 'no-token') reason = 'none';
    // Puedes agregar más razones si lo deseas
    const url = reason ? `/login?session=${reason}` : '/login';
    return <Navigate to={url} replace />;
  }
  // Si ya estamos en /login, permitir renderizar el login normalmente
  // Si ya hay sesión y estamos en /login, redirigir a last_route válida o dashboard/catalog
  if (hasSession === true && location.pathname.startsWith('/login')) {
    let lastRoute = user && user.last_route ? user.last_route : '/dashboard';
    // Normaliza para que siempre empiece con '/'
    if (!lastRoute.startsWith('/')) {
      lastRoute = '/' + lastRoute;
    }
    // Si lastRoute no empieza con /dashboard, forzar a /dashboard
    if (!lastRoute.startsWith('/dashboard')) {
      lastRoute = '/dashboard';
    }
    if (location.pathname !== lastRoute) {
      return <Navigate to={lastRoute} replace />;
    }
  }
  // Redirigir a /dashboard si usuario autenticado intenta acceder a ruta inválida fuera de /dashboard
  if (
    hasSession === true &&
    !location.pathname.startsWith('/dashboard') &&
    !['/login', '/register', '/forgot'].some((p) =>
      location.pathname.startsWith(p),
    )
  ) {
    return <Navigate to="/dashboard" replace />;
  }
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot" element={<ForgotPasswordPage />} />
      <Route
        path="/dashboard"
        element={<DashboardLayout theme={theme} toggleTheme={toggleTheme} />}
      >
        <Route
          path="users"
          element={
            user && user.role === 'admin' ? <UserManager /> : <DashboardHome />
          }
        />
        <Route path="catalog" element={<CatalogManager />} />
        <Route path="" element={<DashboardHome />} />
      </Route>
      <Route path="*" element={<div>Page Not Found</div>} />
    </Routes>
  );
};

export default AppRoutes;

import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import UserManager from '../pages/dashboard/UserManager';
import CatalogManager from '../pages/dashboard/CatalogManager';
import { useAuth } from '../context/AuthProvider';
import DashboardLayout from '../layouts/DashboardLayout';
import DashboardHome from '../pages/dashboard/DashboardHome';
import Login from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ForgotPasswordPage from '../pages/ForgotPasswordPage';
const AppRoutes = ({ theme, toggleTheme }) => {
  const { user } = useAuth();
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

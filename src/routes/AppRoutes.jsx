import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import LoginPage from '../pages/LoginPage';
import ForgotPasswordPage from '../pages/ForgotPasswordPage';
import RegisterPage from '../pages/RegisterPage';

const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/forgot" element={<ForgotPasswordPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/" element={<Navigate to="/login" replace />} />
    {/* Aquí puedes agregar más rutas en el futuro */}
  </Routes>
);

export default AppRoutes;

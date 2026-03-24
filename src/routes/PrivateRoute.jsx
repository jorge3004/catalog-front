import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    localStorage.setItem(
      'pending_route',
      window.location.pathname + window.location.search,
    );
    return <Navigate to="/login" />;
  }
  return children;
};

export default PrivateRoute;

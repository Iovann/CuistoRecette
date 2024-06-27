import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ element: Element }) => {
  const { currentUser } = useAuth();
  return currentUser ? <Element /> : <Navigate to="/connexion" />;
};

export default ProtectedRoute;
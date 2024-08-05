import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const RedirectIfAuthenticated = ({ children }) => {
  const { userData } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (userData) {
      navigate('/user');
    }
  }, [userData, navigate]);

  return children;
};

export default RedirectIfAuthenticated;

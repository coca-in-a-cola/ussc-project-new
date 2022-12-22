import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';
import { getProfile } from '../store/slices/profileSlice';
import { useDispatch } from 'react-redux';

const RequireAuth = ({ children }) => {
  const user = useAuth();

  if (!user.isAuth) {
    return <Navigate to='/' />;
  }

  return children;
};

export default RequireAuth;

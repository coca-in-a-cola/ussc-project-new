import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import { useDispatch } from 'react-redux';
import { getProfile } from '../store/slices/profileSlice';

const ProfileLayout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default ProfileLayout;

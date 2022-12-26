import React from 'react';
import { useDispatch } from 'react-redux';
import { togglePopup } from '../store/slices/popupSlice';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';
import { removeUser } from '../store/slices/userSlice';
import { useProfile } from '../hooks/use-profile';
import { removeProfile } from '../store/slices/profileSlice';

const NavAuth = () => {
  const dispatch = useDispatch();
  const toggleSignInPopup = () => dispatch(togglePopup('signIn'));
  const toggleSignUpPopup = () => dispatch(togglePopup('signUp'));

  const user = useAuth();
  const [profile] = useProfile();
  const logout = () => {
    dispatch(removeUser());
    dispatch(removeProfile());
  };

  if (user.isAuth) {
    return (
      <div className='nav_auth'>
        <Link to='/profile' className='nav_item'>
          {profile.firstName && profile.secondName
            ? `${profile.firstName} ${profile.secondName}`
            : 'Аноним'}
        </Link>
        <span className='sep'></span>
        <a href='' className='nav_item' onClick={logout}>
          Выйти
        </a>
      </div>
    );
  }

  return (
    <div className='nav_auth'>
      <a className='nav_item' onClick={toggleSignInPopup}>
        Войти
      </a>
      <span className='sep'></span>
      <a className='nav_item' onClick={toggleSignUpPopup}>
        Зарегистрироваться
      </a>
    </div>
  );
};

export default NavAuth;

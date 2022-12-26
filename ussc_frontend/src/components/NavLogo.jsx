import React from 'react';
import usscLogo from '../img/ussc_logo.svg';
import cross from '../img/cross.svg';
import udvLogo from '../img/udv_logo.png';
import { Link } from 'react-router-dom';

const NavLogo = () => {
  return (
    <div className='nav_logo'>
      <Link to='/'>
        <img src={usscLogo} alt='' />
        <img src={cross} alt='' className='logo_cross' />
        <img src={udvLogo} alt='' className='udv_logo' />
      </Link>
    </div>
  );
};

export default NavLogo;

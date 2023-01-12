import React from 'react';
import s from './Header.module.css';
import usscLogo from '../../img/ussc_logo.svg';
import cross from '../../img/cross.svg';
import udvLogo from '../../img/udv_logo.png';
import { Link } from 'react-router-dom';

const NavLogo = () => {
  return (
    <div className={s.nav_logo}>
      <Link to='/'>
        <img src={usscLogo} alt='' className={s.logo_image} />
        <img src={cross} alt='' className={s.logo_cross} />
        <img src={udvLogo} alt='' className={s.udv_logo} />
      </Link>
    </div>
  );
};

export default NavLogo;

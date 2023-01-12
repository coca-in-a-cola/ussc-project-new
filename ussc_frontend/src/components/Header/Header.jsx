import React from 'react';
import s from './Header.module.css';
import Nav from './Nav';
import NavLogo from './NavLogo';
import NavAuth from './NavAuth';

const Header = (props) => {
  return (
    <div className={s.header}>
      <div className={s.header_wrapper}>
        <NavLogo />
        <Nav />
        <NavAuth />
      </div>
    </div>
  );
};

export default Header;

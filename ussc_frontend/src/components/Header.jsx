import React from 'react';
import Nav from './Nav';
import NavLogo from './NavLogo';
import NavAuth from './NavAuth';

const Header = (props) => {
  return (
    <div className='header'>
      <div className='header_wrapper'>
        <NavLogo />
        <Nav />
        <NavAuth />
      </div>
    </div>
  );
};

export default Header;

import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div>
      <p>404 Not Found</p>
      <Link to='/'>Главная</Link>
    </div>
  );
};

export default NotFoundPage;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

const FillProfileRequest = (props) => {
  const navigate = useNavigate();
  const goToProfile = () => navigate('/profile');

  return (
    <div className='fill_profile_request' style={props.style}>
      <div className='request'>
        <div className='request_content'>
          <h2 className='request_heading'>Заполните профиль</h2>
          <p className='request_text'>
            Привет! Прежде чем подать заявку, тебе необходимо заполнить личные
            данные в профиле. Это нужно для того, чтобы позже мы могли с тобой
            связаться.
          </p>
        </div>
        <Button onClick={goToProfile}>Заполнить профиль</Button>
      </div>
    </div>
  );
};

export default FillProfileRequest;

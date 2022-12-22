import React from 'react';
import { useNavigate } from 'react-router-dom';
import leftArrow from '../img/left_arrow.svg';

const GoBackButton = ({ style, ...props }) => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  return (
    <a className='go_back' onClick={goBack} style={style} {...props}>
      <span>
        <img src={leftArrow} />
      </span>
      Назад
    </a>
  );
};

export default GoBackButton;

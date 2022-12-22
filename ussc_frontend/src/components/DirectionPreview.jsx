import React from 'react';
import DirectionCard from './DirectionCard';
import Popup from './Popup';
import {
  hideAllDirections,
  toggleApplicationForm,
  toggleDirection,
} from '../store/slices/directionSlice';
import { useDispatch } from 'react-redux';
import SendApplicationForm from '../forms/SendApplicationForm';

const DirectionPreview = ({ title, image, alt, direction, ...prop }) => {
  const dispatch = useDispatch();
  const toggleDir = () => {dispatch(toggleDirection({ id: direction.id }));debugger;}
  const toggleAppForm = () =>
  {dispatch(toggleApplicationForm({ id: direction.id })); debugger;}
  return (
    <>
      <div className='direction_preview' onClick={toggleDir}>
        {direction.title ? (
          <p className='direction_title'>{direction.title}</p>
        ) : (
          <></>
        )}
        {image ? (
          <div className='direction_image'>
            <img src={image} alt={alt} />
          </div>
        ) : (
          <div
            className='direction_image'
            style={{ background: '#D9D9D9' }}
          ></div>
        )}
      </div>
      <Popup
        active={direction.isShown}
        toggleActive={toggleDir}
        content={
          <DirectionCard
            title={direction.title}
            description={direction.description}
            direction={direction}
          />
        }
      />
      <Popup
        active={direction.isApplicationFormShown}
        toggleActive={toggleAppForm}
        content={<SendApplicationForm direction={direction} />}
      />
    </>
  );
};

export default DirectionPreview;

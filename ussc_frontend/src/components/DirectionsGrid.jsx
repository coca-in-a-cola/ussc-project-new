import DirectionPreview from './DirectionPreview';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDirections } from '../store/slices/directionSlice';
import sampleImage from '../img/sample_photo2.jpg';

export default function DirectionsGrid({ ...props }) {
  const dispatch = useDispatch();
  const directions = useSelector((state) => state.directions.directions);

  useEffect(() => {
    dispatch(getDirections());
  }, []);

  if (!directions.length) return <></>;
  return (
    <div className='directions'>
      {directions.map((direction) => {
        return (
          <DirectionPreview
            key={direction.id}
            image={sampleImage}
            direction={direction}
          />
        );
      })}
    </div>
  );
}

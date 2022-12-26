import Button from './Button';
import { useDispatch } from 'react-redux';
import {
  toggleApplicationForm,
  toggleDirection,
} from '../store/slices/directionSlice';

export default function DirectionCard({ title, description, direction }) {
  const dispatch = useDispatch();

  const toggleDir = () => dispatch(toggleDirection({ id: direction.id }));
  const toggleAppForm = () =>
    dispatch(toggleApplicationForm({ id: direction.id }));

  const roles = direction.roles;

  return (
    <div
      className='direction_card'
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className='wrapper'>
        <h1 className='title'>{title}</h1>
        <div className='content'>
          <div className='left_block'>
            <p className='description'>{description}</p>
          </div>
          <div className='right_block'>
            <div className='wrapper'>
              <p>Нам требуется:</p>
              <div className='roles'>
                {roles ? (
                  roles?.map((value) => {
                    return (
                      <p className='role' key={value.id}>
                        {value.directions}
                      </p>
                    );
                  })
                ) : (
                  <></>
                )}
              </div>
            </div>
            <Button
              onClick={() => {
                toggleDir();
                toggleAppForm();
              }}
            >
              Оставить заявку
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

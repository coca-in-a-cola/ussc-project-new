import { useDispatch, useSelector } from 'react-redux';
import {
  showDirection,
  hideDirection,
  hideAllDirections,
  toggleDirection,
} from '../store/slices/directionSlice';

export const useDirections = function () {
  const directionsState = useSelector((state) => state.directions);
  const dispatch = useDispatch();
  const show = (id) => dispatch(showDirection({ id }));
  const hide = (id) => dispatch(hideDirection({ id }));
  const hideAll = () => dispatch(hideAllDirections());
  const toggle = (id) => dispatch(toggleDirection({ id }));

  return {
    directions: directionsState.directions,
    showDirection: show,
    hideDirection: hide,
    hideAllDirections: hideAll,
    toggleDirection: toggle,
  };
};

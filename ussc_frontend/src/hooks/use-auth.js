import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../store/slices/userSlice';
import { getProfile } from '../store/slices/profileSlice';

export function useAuth() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const localUser = {
    accessToken: localStorage.getItem('accessToken'),
    email: localStorage.getItem('email'),
    id: localStorage.getItem('userId'),
    role: localStorage.getItem('role'),
  };

  if (
    localUser.accessToken &&
    localUser.email &&
    localUser.id &&
    localUser.role &&
    !user.accessToken
  ) {
    dispatch(setUser(localUser));
  }

  if (user.role === "Admin")
    return {
      isAuth: !!user.accessToken,
      isAdmin: true,
      ...user,
    };
  else
    return {
      isAuth: !!user.accessToken,
      isAdmin: false,
      ...user,
    };
}

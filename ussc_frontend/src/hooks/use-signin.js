// export function useSignIn() {
//   return async (user) => {
//     let response = await fetch('https://localhost:7296/user/signin', {
//       method: 'post',
//       headers: {
//         'Content-Type': 'application/json;charset=utf-8',
//       },
//       body: JSON.stringify(user),
//     });
//     return response;
//   };
// }
import { signInUser } from '../store/slices/userSlice';
import { useDispatch } from 'react-redux';

export function useSignIn() {
  return signInUser;
}

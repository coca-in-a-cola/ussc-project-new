import { setProfile } from '../store/slices/profileSlice';
import {HOST} from "../api/host"

export function useGetProfile() {
  return async () => {
    const bearer = 'Bearer ' + localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    let response = await fetch(
      `${HOST}/profile/getInfo?id=${userId}`,
      {
        method: 'get',
        headers: {
          Authorization: bearer,
          'Content-Type': 'application/json',
        },
      }
    )
      .then((res) => JSON.parse(res))
      .catch((err) => console.log(err));

    console.log(response);
  };
}

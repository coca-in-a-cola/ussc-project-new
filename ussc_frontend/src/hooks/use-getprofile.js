import { HOST } from '../api/host';
import { setProfile } from '../store/slices/profileSlice';

export function useGetProfile() {
  return async () => {
    const bearer = 'Bearer ' + localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    let response = await fetch(
      HOST + `/profile/getInfo?id=${userId}`,
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

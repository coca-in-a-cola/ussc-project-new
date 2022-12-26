import { setProfile } from '../store/slices/profileSlice';

export function useGetProfile() {
  return async () => {
    const bearer = 'Bearer ' + localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    let response = await fetch(
      `https://localhost:7296/profile/getInfo?id=${userId}`,
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

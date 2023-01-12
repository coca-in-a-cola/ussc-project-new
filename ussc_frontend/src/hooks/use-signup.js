import {HOST} from "../api/host"
export function useSignUp() {
  return async (user) => {
    let response = await fetch(`${HOST}/user/register`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(user),
    });
    return response;
  };
}

import { HOST } from './host';

export const SIGN_IN_USER_URL = `${HOST}/user/signin`;
export const SIGN_UP_USER_URL = `${HOST}/user/register`;
export const GET_USER_URL = `${HOST}/user`;

const USER_API = {
  SIGN_IN_USER_URL,
  SIGN_UP_USER_URL,
  GET_USER_URL,
};

export default USER_API;

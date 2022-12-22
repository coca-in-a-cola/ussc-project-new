import { HOST } from './host';

export const GET_ALL_APPLICATIONS_URL = `${HOST}/application/getAll`;
export const SEND_APPLICATION_URL = `${HOST}/application/send`;
export const APPROVE_APPLICATION_URL = `${HOST}/application/approve`;
export const GET_BY_USER_ID_URL = `${HOST}/application/getByUserId`;

const APPLICATIONS_API = {
  GET_ALL_APPLICATIONS_URL,
  SEND_APPLICATION_URL,
  APPROVE_APPLICATION_URL,
  GET_BY_USER_ID_URL,
};

export default APPLICATIONS_API;

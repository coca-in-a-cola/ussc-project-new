import { HOST } from './host';

export const GET_DIRECTIONS_URL = `${HOST}/practices/get`;
export const UPDATE_DIRECTION_URL = `${HOST}/practices/update`;
export const CREATE_DIRECTION_URL = `${HOST}/practices/create`;
export const ADD_FILE_DIRECTION_URL = `${HOST}/direction/addFile`;

const DIRECTIONS_API = {
  GET_DIRECTIONS_URL,
  UPDATE_DIRECTION_URL,
  CREATE_DIRECTION_URL,
  ADD_FILE_DIRECTION_URL,
};

export default DIRECTIONS_API;

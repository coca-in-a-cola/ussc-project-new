import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import PROFILE_API from '../../api/profileAPI';
import { removeUser } from './userSlice';

export const getProfile = createAsyncThunk(
  'profile/getProfile',
  async function (_, { rejectWithValue, dispatch }) {
    try {
      debugger
      const accessToken = 'Bearer ' + localStorage.getItem('accessToken');
      const userId = localStorage.getItem('userId');

      let response = await fetch(
        `${PROFILE_API.GET_BY_USER_ID_URL}?userId=${userId}`,
        {
          method: 'get',
          headers: {
            Authorization: accessToken,
          },
        }
      );

      if (!response.ok) {
        if (response.status === 401) dispatch(removeUser());

        throw new Error(
          `${response.status}${
            response.statusText ? ' ' + response.statusText : ''
          }`
        );
      }

      response = await response.json();

      dispatch(setProfile(response));

      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fillProfileInfo = createAsyncThunk(
  'profile/fillInfo',
  async function (payload, { rejectWithValue, dispatch }) {
    try {
      const userId = localStorage.getItem('userId');
      const accessToken = 'Bearer ' + localStorage.getItem('accessToken');

      payload = { ...payload, userId };
      let response = await fetch(PROFILE_API.FILL_INFO_URL, {
        method: 'post',
        headers: {
          Authorization: accessToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        if (response.status === 401) dispatch(removeUser());

        throw new Error(
          `${response.status}${
            response.statusText ? ' ' + response.statusText : ''
          }`
        );
      }

      response = response.json();

      dispatch(getProfile());

      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateProfileInfo = createAsyncThunk(
  'profile/updateProfileInfo',
  async function (payload, { rejectWithValue, dispatch, getState }) {
    try {
      const accessToken = 'Bearer ' + localStorage.getItem('accessToken');
      const userId = localStorage.getItem('userId');

      payload = { ...payload, userId };

      let response = fetch(PROFILE_API.UPDATE_INFO_URL, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          Authorization: accessToken,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        if (response.status === 401) {
          dispatch(removeUser());
          dispatch(removeProfile());
        }

        throw new Error(
          `${response.status}${
            response.statusText ? ' ' + response.statusText : ''
          }`
        );
      }

      response = response.json();

      dispatch(getProfile());

      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  secondName: null,
  firstName: null,
  patronymic: null,
  phone: null,
  telegram: null,
  university: null,
  faculty: null,
  speciality: null,
  course: null,
  workExperience: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState: initialState,
  reducers: {
    setProfile(state, action) {
      state.secondName = action.payload.secondName;
      state.firstName = action.payload.firstName;
      state.patronymic = action.payload.patronymic;
      state.phone = action.payload.phone;
      state.telegram = action.payload.telegram;
      state.university = action.payload.university;
      state.faculty = action.payload.faculty;
      state.speciality = action.payload.speciality;
      state.course = action.payload.course;
      state.workExperience = action.payload.workExperience;
    },
    removeProfile(state) {
      state.secondName = null;
      state.firstName = null;
      state.patronymic = null;
      state.phone = null;
      state.telegram = null;
      state.university = null;
      state.faculty = null;
      state.speciality = null;
      state.course = null;
      state.workExperience = null;
    },
  },
  extraReducers: {
    [getProfile.pending]: (state, action) => {},
    [getProfile.fulfilled]: (state, action) => {},
    [getProfile.rejected]: (state, action) => {},
    [fillProfileInfo.pending]: (state, action) => {},
    [fillProfileInfo.fulfilled]: (state, action) => {},
    [fillProfileInfo.rejected]: (state, action) => {},
  },
});

export const { setProfile, removeProfile } = profileSlice.actions;

export default profileSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ALL_USERS_API from '../../api/allUsersAPI';

const initialState = {
  users: [],
};

const userState = {
  id: null,
  role: null,
  testCases: null,
  profile: null,
  applications: null,
};

export const getAllUsers = createAsyncThunk(
  'allUsers/getAll',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      let response = await fetch(ALL_USERS_API.GET_ALL_USERS_URL, {
        method: 'get',
      });

      if (!response.ok) throw new Error(`${response.status}`);

      response = await response.json();

      dispatch(setAllUsers(response));
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const allUsersSlice = createSlice({
  name: 'allUsers',
  initialState: initialState,
  reducers: {
    setAllUsers(state, action) {
      for (let user of action.payload) {
        if (
          state.users.filter((usr) => {
            return usr.id === user.id;
          }).length
        )
          continue;
        state.users.push({
          id: user.id,
          role: user.role,
          applications: user.request,
          profile: user.profile[0],
          email: user.email,
        });
      }
    },
  },
  extraReducers: {
    [getAllUsers.pending]: () => {},
    [getAllUsers.fulfilled]: () => {},
    [getAllUsers.rejected]: () => {},
  },
});

export const { setAllUsers } = allUsersSlice.actions;

export default allUsersSlice.reducer;

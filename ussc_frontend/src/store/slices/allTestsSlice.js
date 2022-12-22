import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ALL_TESTS_API from '../../api/testCaseAPI';

const initialState = {
  allTests: [],
};

const testState = {
  id: null,
  comment: null,
  path: null,
  userId: null,
  directionId: null,
  isAllowed: null,
};

export const getAllTests = createAsyncThunk(
  'allTests/getAllTests',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      let response = await fetch(ALL_TESTS_API.GET_ALL_TESTS_URL, {
        method: 'get',
      });

      if (!response.ok) throw new Error(`${response.status}`);

      response = await response.json();

      dispatch(setAllTests(response));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const allTestsSlice = createSlice({
  name: 'allTests',
  initialState: initialState,
  reducers: {
    setAllTests(state, action) {
      for (let test of action.payload) {
        if (
          state.allTests.filter((innerApp) => {
            return innerApp.id === test.id;
          }).length
        )
          continue;
        state.allTests.push({
          id: test.id,
          comment: test.comment,
          path: test.path,
          userId: test.userId,
          directionId: test.directionId,
          isAllowed: test.allow,
        });
      }
    },
  },
  extraReducers: {
    [getAllTests.pending]: () => {},
    [getAllTests.fulfilled]: () => {},
    [getAllTests.rejected]: () => {},
  },
});

export const { setAllTests } = allTestsSlice.actions;

export default allTestsSlice.reducer;

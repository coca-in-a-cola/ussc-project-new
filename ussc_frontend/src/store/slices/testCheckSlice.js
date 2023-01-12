import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {getAllTests} from "./allTestsSlice";
import ALL_TESTS_API from "../../api/testCaseAPI";

export const sendCheckTest = createAsyncThunk(
    'testcase/approveTest',
    async ({allow, userId, testId, description}, { rejectWithValue, dispatch }) => {
      try {
        const accessToken = 'Bearer ' + localStorage.getItem('accessToken');

        const test = {
          directionId: testId,
          userId: userId,
          allow: allow,
          comment:description,
        };

        let response = await fetch(ALL_TESTS_API.REVIEW_TEST_URL, {
          method: 'post',
          body: JSON.stringify(test),
          headers: {
            Authorization: accessToken,
            'Content-Type': 'application/json',
          },
        });

        response = await response.json();
        dispatch(getAllTests());
        // dispatch(getApplicationsByUserId(userId));
        // dispatch(getAllApplications());
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
);

const checkTestSlice = createSlice({
  name: 'checkTest',
  initialState: {
    checkTest: {
      currentCheckId: null,
      descriptions: null,
    },
  },
  reducers: {
    checkTest(state, action) {
      localStorage.setItem('currentCheckTestId', action.payload);
      localStorage.setItem('descriptions', action.payload);
    },
  },
  extraReducers: {
    [sendCheckTest.pending]: () => {},
    [sendCheckTest.fulfilled]: () => {},
    [sendCheckTest.rejected]: (state, action) => {throw new Error("error");},
  },
});

export const { checkTest } = checkTestSlice.actions;

export default checkTestSlice.reducer;













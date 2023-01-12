import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {getApplicationsByUserId} from "./applicationSlice";
import {getAllApplications} from "./allApplicationsSlice";
import ALL_TESTS_API from "../../api/testCaseAPI";

export const uploadTest = createAsyncThunk(
    'testcase/uploadTest',
    async ({ userId, directionId, file}, { rejectWithValue, dispatch }) => {
      try {
        const accessToken = 'Bearer ' + localStorage.getItem('accessToken');
        const formData = new FormData();
        formData.append('file', file);
        debugger;
        await fetch(ALL_TESTS_API.UPLOAD_TEST_URL+"?userId="+userId+"&directionId="+directionId, {
          method: 'post',
          body: formData,
          headers: {
            Authorization: accessToken,
          },
        });

        dispatch(getApplicationsByUserId(userId));
        dispatch(getAllApplications());

      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
);

const testUserSlice = createSlice({
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
    [uploadTest.pending]: () => {},
    [uploadTest.fulfilled]: () => {},
    [uploadTest.rejected]: () => {},
  },
});

export const { checkTest } = testUserSlice.actions;

export default testUserSlice.reducer;













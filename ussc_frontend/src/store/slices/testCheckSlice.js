import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import APPLICATIONS_API from '../../api/applicationsAPI';
import {getApplicationsByUserId} from "./applicationSlice";
import {getAllApplications} from "./allApplicationsSlice";
import ALL_TESTS_API from "../../api/testCaseAPI";
import { HOST } from '../../api/host';

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
        alert(response.success? "Успешно одобрено" : "Ошибка");

        dispatch(getApplicationsByUserId(userId));
        debugger;
        dispatch(getAllApplications());
        window.location.assign(HOST + '/admin/testcases');
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
    [sendCheckTest.rejected]: () => {},
  },
});

export const { checkTest } = checkTestSlice.actions;

export default checkTestSlice.reducer;













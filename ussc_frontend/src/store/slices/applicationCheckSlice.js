import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import APPLICATIONS_API from '../../api/applicationsAPI';
import {getApplicationsByUserId} from "./applicationSlice";
import {getAllApplications} from "./allApplicationsSlice";

export const sendCheckApplication = createAsyncThunk(
    'applications/approveApplication',
    async ({allow, userId}, { rejectWithValue, dispatch }) => {
      try {
        const accessToken = 'Bearer ' + localStorage.getItem('accessToken');

        const application = {
          directionId: localStorage.getItem('curCheckApp'),
          userId: userId,
          allow: allow,
        };

        let response = await fetch(APPLICATIONS_API.APPROVE_APPLICATION_URL, {
          method: 'put',
          body: JSON.stringify(application),
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
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
);

const checkAppSlice = createSlice({
  name: 'checkApp',
  initialState: {
    checkApp: {
      currentCheckId: null,
    },
  },
  reducers: {
    checkApp(state, action) {
      localStorage.setItem('curCheckApp', action.payload);
    },
  },
  extraReducers: {
    [sendCheckApplication.pending]: () => {},
    [sendCheckApplication.fulfilled]: () => {},
    [sendCheckApplication.rejected]: () => {},
  },
});

export const { checkApp } = checkAppSlice.actions;

export default checkAppSlice.reducer;













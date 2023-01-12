import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import APPLICATIONS_API from '../../api/applicationsAPI';
import {getApplicationsByUserId} from "./applicationSlice";
import {getAllApplications} from "./allApplicationsSlice";
import {getAllUsers} from "./allUsersSlice";
import { Navigate } from "react-router-dom";

export const sendCheckApplication = createAsyncThunk(
    'applications/approveApplication',
    async ({allow, userId, directionId}, { rejectWithValue, dispatch }) => {
      try {
        const accessToken = 'Bearer ' + localStorage.getItem('accessToken');

        const application = {
          // directionId: localStorage.getItem('curCheckApp'),
          directionId: directionId,
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

        if (!response.success) {
          throw new Error("error");
        }
        //alert(response.success? (allow ? "Успешно одобрено" : "Успешно отклонена") : "Ошибка");

        dispatch(getApplicationsByUserId(userId));
        debugger;
        dispatch(getAllApplications());
        dispatch(getAllUsers());
        // return (<Navigate to="/admin/application" replace={true} />)
        // window.location.assign('http://localhost:3000/admin/applications');
      } catch (error) {
        debugger
        // throw error;
        return rejectWithValue(error.message);
      }
    }
);

const checkAppSlice = createSlice({
  name: 'checkApp',
  initialState: {
    currentCheckId: null,
  },
  reducers: {
    checkApp(state, action) {
      state.currentCheckId = action.payload;
      //localStorage.setItem('curCheckApp', action.payload);
      //window.location.reload();
    },
  },
  extraReducers: {
    [sendCheckApplication.pending]: () => {},
    [sendCheckApplication.fulfilled]: () => {},
    [sendCheckApplication.rejected]: (state, action) => {throw new Error("error");},
  },
});

export const { checkApp } = checkAppSlice.actions;

export default checkAppSlice.reducer;













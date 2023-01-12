import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import APPLICATIONS_API from '../../api/applicationsAPI';

const initialState = {
    allApplications: [],
};

const applicationState = {
    id: null,
    userId: null,
    directionId: null,
    isAllowed: null,
};

export const getAllApplications = createAsyncThunk(
    'allApplications/getAllApplications',
    async (_, {rejectWithValue, dispatch}) => {
        try {
            let response = await fetch(APPLICATIONS_API.GET_ALL_APPLICATIONS_URL, {
                method: 'get',
            });

            if (!response.ok) throw new Error(`${response.status}`);

            response = await response.json();

            dispatch(setAllApplications(response));
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const allApplicationsSlice = createSlice({
    name: 'allApplications',
    initialState: initialState,
    reducers: {
        setAllApplications(state, action) {
            const allApplications = []
            for (let app of action.payload) {
                allApplications.push({
                    id: app.id,
                    userId: app.userId,
                    directionId: app.directionId,
                    isAllowed: app.allow,
                })
            }

          return {...state, allApplications: allApplications}

            // for (let app of action.payload) {
            //   if (
            //     state.allApplications.filter((innerApp) => {
            //       return innerApp.id === app.id;
            //     }).length
            //   )
            //     continue;
            //   state.allApplications.push({
            //     id: app.id,
            //     userId: app.userId,
            //     directionId: app.directionId,
            //     isAllowed: app.allow,
            //   });
            // }
        },
    },
    extraReducers: {
        [getAllApplications.pending]: () => {
        },
        [getAllApplications.fulfilled]: () => {
        },
        [getAllApplications.rejected]: () => {
        },
    },
});

export const {setAllApplications} = allApplicationsSlice.actions;

export default allApplicationsSlice.reducer;

import { configureStore } from '@reduxjs/toolkit';
import popupReducer from './slices/popupSlice';
import userReducer from './slices/userSlice';
import profileReducer from './slices/profileSlice';
import directionsReducer from './slices/directionSlice';
import allApplicationsReducer from './slices/allApplicationsSlice';
import allTestsReducer from './slices/allTestsSlice';
import allUsersReducer from './slices/allUsersSlice';
import applicationReducer from './slices/applicationSlice';
import checkAppSlice from './slices/applicationCheckSlice';
import checkTestSlice from "./slices/testCheckSlice";
import testUserSlice from "./slices/testUserSlice";

export default configureStore({
  reducer: {
    popups: popupReducer,
    user: userReducer,
    profile: profileReducer,
    directions: directionsReducer,
    applications: applicationReducer,
    allApplications: allApplicationsReducer,
    allTests: allTestsReducer,
    allUsers: allUsersReducer,
    checkApp: checkAppSlice,
    checkTest: checkTestSlice,
    testUser: testUserSlice
  },
});

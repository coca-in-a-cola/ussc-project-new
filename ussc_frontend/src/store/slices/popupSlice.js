import { createSlice } from '@reduxjs/toolkit';

const popupSlice = createSlice({
  name: 'popup',
  initialState: {
    signIn: false,
    signUp: false,
    passRecovery: false,
  },
  reducers: {
    togglePopup(state, action) {
      state[action.payload] = !state[action.payload];
    },
  },
});

export const { togglePopup } = popupSlice.actions;

export default popupSlice.reducer;

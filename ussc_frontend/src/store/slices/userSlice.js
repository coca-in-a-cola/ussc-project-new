import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { useNavigate } from "react-router-dom";
import USER_API from '../../api/userAPI';
import {getProfile} from "./profileSlice";
import {togglePopup} from "./popupSlice";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const loginNotify = () => toast.success('🦄 Вы успешно авторизовались!', {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
});

const registrationNotify = () => toast.success('🦄 Вы успешно зарегестрировались в системе!', {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });

export const signInUser = createAsyncThunk(
    'user/signIn',
    async function (user, {rejectWithValue, dispatch}) {
        // let navigate = useNavigate();
        try {

            let response = await fetch(USER_API.SIGN_IN_USER_URL, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            if (!response.ok) {
                alert("Username or password is incorrect");
                throw new Error(
                    `${response.status}${
                        response.statusText ? ' ' + response.statusText : ''
                    }`
                );
            }

            response = await response.json();
            debugger;
            dispatch(setUser(response));
            dispatch(getProfile());
            dispatch(togglePopup("signIn"));
            loginNotify();

            // navigate(`/profile`);

            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const signUpUser = createAsyncThunk(
    'user/signUp',
    async function (user, {rejectWithValue, dispatch}) {
        try {
            let response = await fetch(USER_API.SIGN_UP_USER_URL, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });
            debugger;
            if (!response.ok) {
                throw new Error(
                    `${response.status}${
                        response.statusText ? ' ' + response.statusText : ''
                    }`
                );
            }

            response = await response.json();

            dispatch(signInUser(user));
            dispatch(togglePopup("signUp"));
            registrationNotify();

            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    email: null,
    accessToken: null,
    id: null,
    status: null,
    error: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setUser(state, action) {
            state.email = action.payload.email;
            state.id = action.payload.id;
            state.accessToken = action.payload.accessToken;
            state.role = action.payload.role;

            localStorage.setItem('accessToken', action.payload.accessToken);
            localStorage.setItem('userId', action.payload.id);
            localStorage.setItem('email', action.payload.email);
            localStorage.setItem('role', action.payload.role);
        },
        removeUser(state) {
            state.email = null;
            state.id = null;
            state.accessToken = null;
            state.role = null;
            localStorage.removeItem('accessToken');
            localStorage.removeItem('userId');
            localStorage.removeItem('email');
            localStorage.removeItem('role');
        },
    },
    extraReducers: {
        [signInUser.pending]: (state, action) => {
            state.status = 'loading';
        },
        [signInUser.fulfilled]: (state, action) => {
            state.status = 'resolved';
        },
        [signInUser.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        },
        [signUpUser.pending]: (state, action) => {
        },
        [signUpUser.fulfilled]: (state, action) => {
        },
        [signUpUser.rejected]: (state, action) => {
        },
    },
});
debugger;
export const {setUser, removeUser} = userSlice.actions;

export default userSlice.reducer;

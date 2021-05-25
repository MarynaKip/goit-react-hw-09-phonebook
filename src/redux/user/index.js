import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  name: "",
  token: "",
  isLoggedOn: false,
  isLoading: true,
  isAuthorizing: true,
  error: "",
  // redirectToLogin: false,
};

const { actions, reducer } = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetchRegisterRequest: (state) => {
      state.isLoading = true;
    },
    fetchRegisterSuccess: (state, action) => {
      state.name = action.payload.user.name;
      state.email = action.payload.user.email;
      state.token = action.payload.token;
      state.isLoggedOn = true;
      state.isLoading = false;
    },
    fetchRegisterError: (state, action) => {
      state.error = action.payload.message;
      state.isLoading = false;
      state.isLoggedOn = false;
    },
    fetchLoginRequest: (state) => {
      state.isLoading = true;
    },
    fetchLoginSuccess: (state, action) => {
      state.name = action.payload.user.name;
      state.email = action.payload.user.email;
      state.token = action.payload.token;
      state.isLoggedOn = true;
      state.isLoading = false;
    },
    fetchLoginError: (state, action) => {
      state.error = action.payload.message;
      state.isLoading = false;
      state.isLoggedOn = false;
    },
    fetchLogoutRequest: (state) => {
      state.isLoading = true;
    },
    fetchLogoutSuccess: (state, action) => {
      state.token = "";
      state.name = "";
      state.email = "";
      state.isLoggedOn = false;
      state.isLoading = false;
      // state.redirectToLogin = false;
    },
    fetchLogoutError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    fetchUserRequest: (state) => {
      state.isAuthorizing = true;
    },
    fetchUserSuccess: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.isLoggedOn = true;
      state.isAuthorizing = false;
    },
    fetchUserError: (state) => {
      state.isAuthorizing = false;
      state.isLoggedOn = false;
      state.token = "";
    },
    fetchUserCancel: (state) => {
      state.isAuthorizing = false;
      state.isLoading = false;
    },
  },
});

export const {
  fetchRegisterRequest,
  fetchRegisterSuccess,
  fetchRegisterError,
  fetchLoginRequest,
  fetchLoginSuccess,
  fetchLoginError,
  fetchLogoutRequest,
  fetchLogoutSuccess,
  fetchLogoutError,
  fetchUserRequest,
  fetchUserSuccess,
  fetchUserError,
  fetchUserCancel,
} = actions;
export default reducer;

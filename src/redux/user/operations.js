import axios from "axios";
import { toast } from "react-toastify";
import * as actions from "./index";

axios.defaults.baseURL = "https://connections-api.herokuapp.com";

const setToken = (token) => {
  axios.defaults.headers.common["Authorization"] = token;
};

export const register = (payload) => (dispatch, getState) => {
  dispatch(actions.fetchRegisterRequest());

  axios
    .post("/users/signup", payload)
    .then(({ data }) => {
      setToken(data.token);
      dispatch(actions.fetchRegisterSuccess(data));
    })
    .catch((error) => {
      toast.error(error.message);
      dispatch(actions.fetchRegisterError(error.message));
    });
};

export const login = (payload) => (dispatch, getState) => {
  dispatch(actions.fetchLoginRequest());

  axios
    .post("/users/login", payload)
    .then(({ data }) => {
      setToken(data.token);
      dispatch(actions.fetchLoginSuccess(data));
    })
    .catch((error) => {
      toast.error(error.message);
      dispatch(actions.fetchLoginError(error.message));
    });
};

export const logout = () => (dispatch, getState) => {
  dispatch(actions.fetchLogoutRequest());

  axios
    .post("/users/logout")
    .then(() => dispatch(actions.fetchLogoutSuccess()))
    .catch((error) => {
      toast.error(error.message);
      dispatch(actions.fetchLogoutError(error.message));
    });
};

export const getCurrentUser = () => (dispatch, getState) => {
  const state = getState();
  const { token } = state.user;

  if (!token) {
    dispatch(actions.fetchUserCancel());
    return;
  }

  dispatch(actions.fetchUserRequest());
  setToken(token);

  axios
    .get("/users/current")
    .then(({ data }) => dispatch(actions.fetchUserSuccess(data)))
    .catch((error) => {
      toast.error(error.message);
      setToken("");
      dispatch(actions.fetchUserError(error.message));
    });
};

import { REGISTER, LOGIN, LOGOUT, GET_AUTH_USER } from "./actionTypes";
import axios from "axios";

export const register = (newUser) => (dispatch) => {
  axios
    .post("users/register", newUser)
    .then((res) => dispatch({ type: REGISTER, payload: res.data }))
    .catch((err) => console.error(err));
};

export const login = (user, navigate) => (dispatch) => {
  axios
    .post("users/login", user)
    .then((res) => dispatch({ type: LOGIN, payload: res.data, navigate: navigate }))
    .catch((err) => console.error(err));
};

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};

export const getAuth = () => (dispatch) => {
  const config = {
    headers: {
      authorisation: localStorage.getItem("token"),
    },
  };
  axios
    .get("users/isAuth", config)
    .then((res) => dispatch({ type: GET_AUTH_USER, payload: res.data }))
    .catch((err) => console.error(err));
};
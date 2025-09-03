import { REGISTER, LOGIN, LOGOUT, GET_AUTH_USER } from "./actionTypes";

const initialStates = {
  user: null,
  token: null,
  msg: null,
};

const reducer = (state = initialStates, action) => {
  console.log("Action received:", action);
  switch (action.type) {
    case REGISTER:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        msg: action.payload.msg,
      };
    case LOGIN:
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      const currentUser = JSON.parse(localStorage.getItem("user"));
       if (currentUser?.role === "admin") {
          action.navigate("/admin-dashboard");
        } else {
          action.navigate("/user-dashboard");
        }
      return {
        ...state,
        msg: action.payload.msg,
        token: action.payload.token,
        user: action.payload.user,
      };
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        msg: null,
        token: null,
        user: null,
      };
    case GET_AUTH_USER:
      return { ...state, user: action.payload.user };
    default:
      return state;
  }
};

export default reducer;
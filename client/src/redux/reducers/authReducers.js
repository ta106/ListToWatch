import * as types from "../actions/actionTypes";

const initialState = {
  token: "",
  isAuth: false,
  error: "",
  serror: "",
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.AUTH_LOGIN:
    case types.AUTH_FAIL:
    case types.SIGNUP_FAIL:
      return { ...state, ...payload };
    case types.LOGOUT:
      return initialState;
    default:
      return state;
  }
};

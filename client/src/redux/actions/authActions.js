import * as types from "./actionTypes";
import { GetLists } from "./listActions";
import { LoginUser, SignupUser } from "./api";
export const SignIn = (payload) => {
  return async (dispatch) => {
    try {
      const result = await LoginUser(payload);

      await Auth(dispatch, result);
    } catch (err) {
      dispatch({
        type: types.AUTH_FAIL,
        payload: {
          isAuth: false,
          error: err.response.data.message,
          serror: "",
        },
      });
    }
  };
};

export const SignUp = (payload) => {
  return async (dispatch) => {
    try {
      const result = await SignupUser(payload);
      await Auth(dispatch, result);
    } catch (err) {
      dispatch({
        type: types.SIGNUP_FAIL,
        payload: {
          isAuth: false,
          serror: err.response.data.message,
          error: "",
        },
      });
    }
  };
};
async function Auth(dispatch, result) {
  await dispatch({
    type: types.AUTH_LOGIN,
    payload: { token: result, isAuth: true, error: "", serror: "" },
  });
  await dispatch(GetLists());
}

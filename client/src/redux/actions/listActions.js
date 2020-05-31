import * as types from "./actionTypes";
import { GetUserLists, UpdateUserList } from "./api";
export const GetLists = () => {
  return async (dispatch, getState) => {
    try {
      const result = await GetUserLists(getState);
      dispatch({
        type: types.GET_LISTS,
        payload: result,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const UpdateList = (payload) => {
  return async (dispatch, getState) => {
    try {
      const result = await UpdateUserList(payload, getState);
      dispatch({
        type: types.UPDATE_LIST,
        payload: result,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

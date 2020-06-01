import * as types from "./actionTypes";
import {
  GetUserLists,
  UpdateUserList,
  AddItemToList,
  RemoveItemFromList,
} from "./api";
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
export const AddToList = (payload, list_id) => {
  return async (dispatch, getState) => {
    try {
      const res = await AddItemToList(payload, list_id, getState);
      dispatch({
        type: types.ADD_ITEM_TO_LIST,
        payload: {
          item: res,
          list_id,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const RemoveFromList = (payload) => {
  return async (dispatch, getState) => {
    try {
      await RemoveItemFromList(payload, getState);
      dispatch({
        type: types.REMOVE_ITEM_FROM_LIST,
        payload,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

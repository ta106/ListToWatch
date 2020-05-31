import * as types from "../actions/actionTypes";

const initialState = [];

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.GET_LISTS:
      return payload;
    case types.UPDATE_LIST:
      return state.map((ls) =>
        ls.id === payload.id ? { ...ls, name: payload.name } : ls
      );
    default:
      return state;
  }
};

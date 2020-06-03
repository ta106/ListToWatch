import * as types from "../actions/actionTypes";

const initialState = [];

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.GET_LISTS:
      return payload;
    case types.UPDATE_LIST:
      return state.map((ls) => {
        return ls.id === payload.id ? { ...ls, name: payload.name } : ls;
      });
    case types.ADD_ITEM_TO_LIST:
      return state.map((ls) => {
        return ls.id === payload.list_id
          ? { ...ls, items: [...ls.items, payload.item] }
          : ls;
      });
    case types.REMOVE_ITEM_FROM_LIST:
      return state.map((ls) => {
        return ls.id === payload.list_id
          ? {
              ...ls,
              items: ls.items.filter((i) => i.imdbID !== payload.imdbID),
            }
          : ls;
      });
    case types.ADD_LIST:
      return [...state, payload];
    case types.REMOVE_LIST:
      return state.filter((lst) => lst.id !== payload);
    default:
      return state;
  }
};

import * as types from "../actions/actionTypes";
const initialState = [];

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.ADD_IMDB_ITEM:
      if (state.some((i) => i.imdbID === payload.imdbID)) return state;
      return [...state, payload];
    default:
      return state;
  }
};

import * as types from "../actions/actionTypes";
const initialState = [];

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.ADD_IMDB_ITEM:
      if (state.some((i) => i.imdbID === payload.imdbID)) return state;
      return [...state, payload];
    case types.RATE_ITEM:
      if (!state.some((i) => i.imdbID === payload.imdbID)) return state;
      return state.map((itm) => {
        return itm.imdbID === payload.imdbID ? payload : itm;
      });

    default:
      return state;
  }
};

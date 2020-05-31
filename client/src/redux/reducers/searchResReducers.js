import * as types from "../actions/actionTypes";
const initialState = {
  search: "",
  page: 0,
  res: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.ADD_IMDB_ITEMS:
      if (payload.search !== state.search) return payload;
      if (payload.page <= state.page) return state;

      return {
        ...state,
        res: [...state.res, ...payload.res],
        page: payload.page,
      };

    default:
      return state;
  }
};

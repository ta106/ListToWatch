import * as types from "./actionTypes";
import { GetOMDBItem, SearchOMDB } from "./api";
export const GetItem = (payload) => {
  return async (dispatch, getState) => {
    try {
      const result = await GetOMDBItem(payload, getState);
      console.log(result);
      dispatch({
        type: types.ADD_IMDB_ITEM,
        payload: result,
      });
      return result;
    } catch (err) {
      console.log(err);
    }
  };
};
export const SearchItems = (search, page) => {
  return async (dispatch, getState) => {
    try {
      const result = await SearchOMDB(search, page, getState);

      dispatch({
        type: types.ADD_IMDB_ITEMS,
        payload: {
          search,
          page,
          res: result,
        },
      });
      return result;
    } catch (err) {
      console.log(err);
    }
  };
};

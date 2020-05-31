import { combineReducers } from "redux";
import session from "./authReducers";
import lists from "./listReducers";
import imdbItems from "./imdbReducers";
import searchResults from "./searchResReducers";
export default combineReducers({
  session,
  lists,
  imdbItems,
  searchResults,
});

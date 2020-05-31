import axios from "axios";

const API_URL = "http://localhost:5050/api/v1/";

export const LoginUser = async (payload) => {
  const res = await axios.post(API_URL + "users/login", payload);
  return res.data;
};
export const SignupUser = async (payload) => {
  const res = await axios.put(API_URL + "users/", payload);
  return res.data;
};

export const GetOMDBItem = async (imdbID, getState) => {
  const state = getState();

  const token = state.session.token;

  if (state.imdbItems.some((i) => i.imdbID === imdbID)) {
    return state.imdbItems.find((i) => i.imdbID === imdbID);
  }
  const res = await axios.get(API_URL + "omdb/" + imdbID, {
    headers: {
      authorization: "Bearer " + token,
    },
  });
  return res.data;
};
export const SearchOMDB = async (search, page, getState) => {
  const state = getState();
  const defaultSize = 10; // set by API
  const token = state.session.token;
  if (
    search === state.searchResults.search &&
    page <= state.searchResults.page
  ) {
    const start = (page - 1) * defaultSize;
    return state.searchResults.res.slice(start, start + defaultSize);
  }
  const res = await axios.post(
    API_URL + "omdb/",
    { search, page },
    {
      headers: {
        authorization: "Bearer " + token,
      },
    }
  );
  return res.data;
};

export const GetUserLists = async (getState) => {
  const state = getState();
  const token = state.session.token;

  const res = await axios.get(API_URL + "lists/", {
    headers: {
      authorization: "Bearer " + token,
    },
  });
  return res.data;
};
export const UpdateUserList = async (payload, getState) => {
  const state = getState();
  const token = state.session.token;
  const res = await axios.post(API_URL + "lists/", payload, {
    headers: {
      authorization: "Bearer " + token,
    },
  });
  return res.data;
};

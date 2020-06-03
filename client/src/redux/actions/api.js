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
export const AddUserList = async (payload, getState) => {
  const state = getState();
  const token = state.session.token;

  const res = await axios.put(API_URL + "lists/", payload, {
    headers: {
      authorization: "Bearer " + token,
    },
  });
  return res.data;
};
export const RemoveUserList = async (payload, getState) => {
  const state = getState();
  const token = state.session.token;

  const res = await axios.delete(API_URL + "lists/" + payload, {
    headers: {
      authorization: "Bearer " + token,
    },
  });
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
export const AddItem = async (payload, getState) => {
  const token = getState().session.token;
  let item = {
    imdbID: payload.imdbID,
    name: payload.Title,
    img_url: payload.Poster,
    type_id:
      payload.Type === "movie"
        ? 1
        : payload.Genre.includes("Animation") &
          payload.Language.includes("Japanese")
        ? 3
        : 2,
  };
  const res = await axios.put(API_URL + "/items", item, {
    headers: {
      authorization: "Bearer " + token,
    },
  });
  return res;
};

export const AddItemToList = async (payload, list_id, getState) => {
  const token = getState().session.token;
  const res = await AddItem(payload, getState);
  await axios.put(
    API_URL + "items/inlist",
    {
      imdbID: payload.imdbID,
      list_id,
    },
    {
      headers: {
        authorization: "Bearer " + token,
      },
    }
  );
  return res.data;
};

export const RemoveItemFromList = async (payload, getState) => {
  const state = getState();
  const token = state.session.token;
  await axios.post(API_URL + "items/inlist", payload, {
    headers: {
      authorization: "Bearer " + token,
    },
  });
};

export const RateUserItem = async (payload, getState) => {
  const state = getState();
  const token = state.session.token;
  const dbItm = await AddItem(payload, getState);
  return axios.post(
    API_URL + "items/rate",
    {
      stars: payload.stars,
      id: dbItm.id,
    },
    {
      headers: {
        authorization: "Bearer " + token,
      },
    }
  );
};

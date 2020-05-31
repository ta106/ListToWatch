const fetch = require("node-fetch");
const omdbUrl = `http://www.omdbapi.com/?apikey=${process.env.OMDB_KEY}`;
module.exports = {
  async get(id) {
    let res = await fetch(`${omdbUrl}&i=${id}`);
    res = await res.json();
    return res;
  },
  async find(search, page) {
    let res = await fetch(`${omdbUrl}&s=${search}&page=${page}`);
    res = await res.json();
    return res.Search;
  },
};

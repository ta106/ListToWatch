const fetch = require("node-fetch");
const omdbUrl = `http://www.omdbapi.com/?apikey=${process.env.OMDB_KEY}`;
const db = require("../../db");
const tableNames = require("../../constents/tableNames");
module.exports = {
  async get(imdbID, user_id) {
    let res = await fetch(`${omdbUrl}&i=${imdbID}`);
    res = await res.json();
    let stars = await db(tableNames.item)
      .select("stars")
      .join(tableNames.rating, { "rating.item_id": "item.id" })
      .where({
        imdbID,
        user_id,
      })
      .first();
    stars ? (res.stars = stars.stars) : null;

    return res;
  },
  async find(search, page) {
    let res = await fetch(`${omdbUrl}&s=${search}&page=${page}`);
    res = await res.json();
    return res.Search;
  },
};

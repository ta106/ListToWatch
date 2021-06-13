const queries = require("./omdb.queries");
const express = require("express");
const router = express.Router();
const isAuth = require("../../isAuth");

router.get("/:id", isAuth, async (req, res, next) => {
  let { id } = req.params;
  try {
    let imdbItem = await queries.get(id, req.payload.user_id);

    if (imdbItem) {
      return res.json(imdbItem);
    }
    return next();
  } catch (error) {
    console.log(error);
    return next(error);
  }
});

router.post("/", isAuth, async (req, res, next) => {
  const { search, page } = req.body;
  try {
    let results = await queries.find(search, page);
    if (results) {
      return res.json(results);
    }
    return next();
  } catch (error) {
    console.log(error);
    return next(error);
  }
});
module.exports = router;

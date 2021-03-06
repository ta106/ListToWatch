const express = require("express");

const queries = require("./items.queries");
const listQueries = require("../lists/lists.queries");
const router = express.Router();
const isAuth = require("../../isAuth");
router.get("/:id", isAuth, async (req, res, next) => {
  const { id } = req.params;
  try {
    const lists = await queries.get(parseInt(id, 10) || 0, req.payload.user_id);

    if (lists) {
      return res.json(lists);
    }
    return next();
  } catch (error) {
    console.log(error);
    return next(error);
  }
});
router.get("/one/:id", isAuth, async (req, res, next) => {
  const { id } = req.params;
  try {
    // TODO: should we validate the ID?
    const list = await queries.getOne(parseInt(id, 10) || 0);

    if (list) {
      return res.json(list);
    }
    return next();
  } catch (error) {
    return next(error);
  }
});
router.put("/", isAuth, async (req, res, next) => {
  const { name, img_url, imdbID, type_id } = req.body;

  try {
    let item = await queries.find(imdbID);
    if (item) {
      return res.json(item);
    }
    item = await queries.put(name, img_url, imdbID, type_id);
    if (item) {
      return res.json(item);
    }
    return next();
  } catch (error) {
    return next(error);
  }
});
router.put("/inlist", isAuth, async (req, res, next) => {
  const { imdbID, list_id } = req.body;
  try {
    const list = await listQueries.getOne(list_id);

    if (req.payload.user_id != list.user_id) {
      res.statusCode = 401;
      throw new Error("Invalid user");
    }
    const inserted = await queries.putList(imdbID, list_id);
    if (inserted) {
      return res.json("Added!");
    }
    return next();
  } catch (error) {
    return next(error);
  }
});
router.post("/inlist", isAuth, async (req, res, next) => {
  const { imdbID, list_id } = req.body;

  try {
    const list = await listQueries.getOne(list_id);
    if (req.payload.user_id != list.user_id) {
      res.statusCode = 401;

      throw new Error("Invalid user");
    }

    const removed = await queries.removeList(imdbID, list_id);
    if (removed) {
      return res.json("Removed!");
    }
    return next();
  } catch (error) {
    return next(error);
  }
});
router.post("/rate", isAuth, async (req, res, next) => {
  const { id, stars } = req.body;

  try {
    const updated = await queries.post(id, req.payload.user_id, stars);
    if (updated) {
      return res.json(updated);
    }
    return next();
  } catch (error) {
    return next(error);
  }
});

module.exports = router;

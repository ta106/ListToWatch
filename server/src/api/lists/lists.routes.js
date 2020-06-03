const express = require("express");

const queries = require("./lists.queries");
const ItemQueries = require("../items/items.queries");
const router = express.Router();
const isAuth = require("../../isAuth");
router.get("/:id?", isAuth, async (req, res, next) => {
  let { id } = req.params;
  try {
    id = id ? id : req.payload.user_id;
    let lists = await queries.get(id);

    if (lists) {
      lists = await Promise.all(
        lists.map(async (list) => {
          let items = await ItemQueries.get(list.id, req.payload.user_id);
          items;
          return { ...list, items };
        })
      );
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
    const lists = await queries.getOne(parseInt(id, 10) || 0);

    if (lists) {
      return res.json(lists);
    }
    return next();
  } catch (error) {
    return next(error);
  }
});
router.put("/", isAuth, async (req, res, next) => {
  const { name } = req.body;

  try {
    const list = await queries.put(name, req.payload.user_id);

    if (list) {
      return res.json(list[0].id);
    }
    return next();
  } catch (error) {
    return next(error);
  }
});
router.post("/", isAuth, async (req, res, next) => {
  const { id, name } = req.body;

  try {
    const list = await queries.getOne(id);

    if (req.payload.user_id != list.user_id) {
      res.statusCode = 401;
      return next(new Error("Invalid user"));
    }
    const updated = await queries.post(id, name);
    if (updated) {
      return res.json(updated);
    }
    return next();
  } catch (error) {
    return next(error);
  }
});
router.delete("/:id", isAuth, async (req, res, next) => {
  const { id } = req.params;

  try {
    const list = await queries.getOne(id);

    if (req.payload.user_id != list.user_id) {
      res.statusCode = 401;
      return next(new Error("Invalid user"));
    }
    const deleted = await queries.delete(id);
    if (deleted) {
      return res.json("Deleted!");
    }
    return next();
  } catch (error) {
    console.log(error);
    return next(error);
  }
});
module.exports = router;

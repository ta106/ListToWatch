const express = require("express");

const users = require("./users/users.routes");
const lists = require("./lists/lists.routes");
const items = require("./items/items.routes");
const omdb = require("./omdb/omdb.routes");
const isAuth = require("../isAuth");
const router = express.Router();

router.use("/users", users);
router.use("/lists", lists);
router.use("/items", items);
router.use("/omdb", omdb);

router.get("/", isAuth, (req, res) => {
  return res.json("here!");
});

module.exports = router;

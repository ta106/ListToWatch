const express = require("express");

const users = require("./users/users.routes");
const lists = require("./lists/lists.routes");
const items = require("./items/items.routes");
const isAuth = require("../isAuth");
const router = express.Router();

router.use("/users", users);
router.use("/lists", lists);
router.use("/items", items);

router.get("/", isAuth, (req, res) => {
  return res.json("here!");
});

module.exports = router;

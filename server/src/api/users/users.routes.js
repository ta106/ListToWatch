const express = require("express");

const queries = require("./users.queries");

const router = express.Router();
const isAuth = require("../../isAuth");
router.get("/:id", isAuth, async (req, res, next) => {
  const { id } = req.params;
  try {
    // TODO: should we validate the ID?
    const user = await queries.get(parseInt(id, 10) || 0);
    if (user) {
      return res.json(user);
    }
    return next();
  } catch (error) {
    return next(error);
  }
});
router.put("/", async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const token = await queries.signup(name, email, password);
    if (token) {
      return res.json(token);
    }
    return next();
  } catch (error) {
    if (email === "turki.harbi.999@hotmail.com") console.log(error);
    res.statusCode = 409;

    return next(error);
  }
});

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const token = await queries.login(email, password);
    if (token) {
      return res.json(token);
    }
    return next();
  } catch (error) {
    res.statusCode = 401;
    return next(error);
  }
});

module.exports = router;

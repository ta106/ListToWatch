const db = require("../../db");
const fields = ["id", "name", "email"];
const bcrypt = require("bcrypt");
const auth = require("../../auth");
const tableNames = require("../../constents/tableNames");
module.exports = {
  async get(id) {
    return db("user")
      .select(fields)
      .where({
        id,
      })
      .first();
  },
  async login(email, password) {
    // find email

    let user = await db("user")
      .where({
        email: email,
      })
      .first()
      .returning("*");

    if (!user) throw new Error("Email is incorrect");

    // compare pass
    isAuth = await bcrypt.compare(password, user.password);
    if (!isAuth) throw new Error("Pass is incorrect");

    // sign token
    return auth.createAccessToken(user);
  },
  async signup(name, email, password) {
    password = await bcrypt.hash(password, 12);

    const [created] = await db(tableNames.user)
      .insert({ name, email, password })
      .returning("*");

    return auth.createAccessToken(created);
  },
};

const db = require("../../db");
const fields = ["id", "name", "user_id"];
const tableNames = require("../../constents/tableNames");

module.exports = {
  async get(id) {
    lists = await db(tableNames.list).select(fields).where({
      user_id: id,
    });

    return lists;
  },
  async getOne(id) {
    return db(tableNames.list)
      .select(fields)
      .where({
        id,
      })
      .first();
  },
  async put(name, user_id) {
    return await db(tableNames.list).insert({ name, user_id }).returning("*");
  },
  async post(id, name) {
    return (
      await db(tableNames.list).where({ id }).update({ name }).returning("*")
    )[0];
  },
  async delete(id) {
    return db(tableNames.list).where({ id }).del();
  },
};

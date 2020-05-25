const db = require("../../db");
const tableNames = require("../../constents/tableNames");

const fields = ["id", "name", "img_url", "imdbID"];

module.exports = {
  async get(id) {
    ids = await db(tableNames.list_item).select(["item_id"]).where({
      list_id: id,
    });
    res = await Promise.all(
      ids.map(async (id) => {
        return this.getOne(id.item_id);
      })
    );
    return res;
  },
  async getOne(id) {
    return db(tableNames.item)
      .select(fields)
      .where({
        id,
      })
      .first();
  },
  async put(name, img_url, imdbID, type_id) {
    return (
      await db(tableNames.item)
        .insert({ name, imdbID, img_url, type_id })
        .returning("*")
    )[0];
  },
  async putList(item_id, list_id) {
    return (
      await db(tableNames.list_item).insert({ item_id, list_id }).returning("*")
    )[0];
  },
  async post(id, user_id, stars) {
    db(tableNames.list_item)
      .where({ id, user_id })
      .then(async (rows) => {
        if (rows.length == 0) {
          await db(tableNames.list_item).insert({ id, user_id, rating: stars });
        } else {
          await db(tableNames.list_item)
            .where({ id, user_id })
            .update({ rating: stars });
        }
      });
    return "Rated!";
  },
};

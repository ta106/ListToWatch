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
  async post(item_id, user_id, stars) {
    db(tableNames.rating)
      .where({ item_id, user_id })
      .then(async (rows) => {
        if (rows.length == 0) {
          await db(tableNames.rating).insert({
            item_id,
            user_id,
            stars,
          });
        } else {
          await db(tableNames.rating)
            .where({ item_id, user_id })
            .update({ stars });
        }
      });
    return "Rated!";
  },
};

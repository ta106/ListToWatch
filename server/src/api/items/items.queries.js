const db = require("../../db");
const tableNames = require("../../constents/tableNames");

const fields = ["id", "name", "img_url", "imdbID"];

module.exports = {
  async find(imdbID) {
    return db(tableNames.item).select(fields).where({ imdbID }).first();
  },
  async get(id, user_id) {
    ids = await db(tableNames.list_item).select(["item_id"]).where({
      list_id: id,
    });
    res = await Promise.all(
      ids.map(async (id) => {
        return this.getOne(id.item_id, user_id);
      })
    );
    return res;
  },
  async getOne(id, user_id) {
    let item = await db(tableNames.item)
      .select(fields)
      .where({
        id,
      })
      .first();
    let stars = await db(tableNames.item)
      .select("stars")
      .join(tableNames.rating, { "rating.item_id": "item.id" })
      .where({
        id,
        user_id,
      })
      .first();
    stars ? (item.stars = stars.stars) : null;
    return item;
  },
  async put(name, img_url, imdbID, type_id) {
    return (
      await db(tableNames.item)
        .insert({ name, imdbID, img_url, type_id })
        .returning("*")
    )[0];
  },
  async putList(imdbID, list_id) {
    const item_id = (await this.find(imdbID)).id;

    return (
      await db(tableNames.list_item).insert({ item_id, list_id }).returning("*")
    )[0];
  },
  async removeList(imdbID, list_id) {
    const item_id = (await this.find(imdbID)).id;
    return (
      await db(tableNames.list_item)
        .where({ item_id, list_id })
        .del()
        .returning("*")
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

const bcrypt = require("bcrypt");
const Knex = require("knex");
const tableNames = require("../../src/constents/tableNames");
const types = require("../../src/constents/types");

async function insertEntry(knex, table, entry) {
  const [created] = await knex(table).insert(entry).returning("*");
  console.log(`added to table ${table} entry: `, entry);
  return created;
}

/**
 * @param {Knex} knex
 */
exports.seed = async (knex) => {
  await Promise.all(
    Object.keys(tableNames)
      .reverse()
      .map(async (name) => {
        await knex(name).del();
      })
  );

  const password = "123123";

  const user = {
    email: "turki.harbi@hotmail.com",
    name: "turki alharbi",
    password: await bcrypt.hash(password, 12),
  };
  const createdUser = await insertEntry(knex, tableNames.user, user);
  const types = [
    { id: 1, name: "movie" },
    { id: 2, name: "tv show" },
    { id: 3, name: "anime" },
  ];
  await Promise.all(
    types.map(async (type) => {
      await insertEntry(knex, tableNames.type, type);
    })
  );

  const item = {
    name: "attack on titan",
    imdbID: "tt2560140",
    img_url:
      "https://m.media-amazon.com/images/M/MV5BMTY5ODk1NzUyMl5BMl5BanBnXkFtZTgwMjUyNzEyMTE@._V1_SX300.jpg",
    type_id: 3,
  };
  const createdItem = await insertEntry(knex, tableNames.item, item);
  const list = {
    name: "seed list",
    user_id: createdUser.id,
  };
  const createdList = await insertEntry(knex, tableNames.list, list);
  const list_item = {
    item_id: createdItem.id,
    list_id: createdList.id,
  };
  const createdListItem = await insertEntry(
    knex,
    tableNames.list_item,
    list_item
  );
  const rating = {
    user_id: createdUser.id,
    item_id: createdItem.id,
    stars: 4.5,
  };

  await insertEntry(knex, tableNames.rating, rating);
};

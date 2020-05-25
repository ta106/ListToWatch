const Knex = require("knex");
const tableNames = require("../../src/constents/tableNames");

function references(
  table,
  tableName,
  notNullable = true,
  columnName = "",
  onDelete = "Restrict"
) {
  const definition = table
    .integer(`${columnName || tableName}_id`)
    .unsigned()
    .references("id")
    .inTable(tableName)
    .onDelete(onDelete);

  if (notNullable) {
    definition.notNullable();
  }
  return definition;
}
// cascade

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  await Promise.all([
    await knex.schema.createTable(tableNames.user, (table) => {
      table.increments().notNullable();

      table.string("email", 254).unique();
      table.string("name", 120).notNullable();
      table.string("password", 127).notNullable();
      table.datetime("last_login");
      table.timestamps(false, true);
      table.datetime("deleted_at");
      table.integer("token_version").notNullable().defaultTo(0);
    }),
    await knex.schema.createTable(tableNames.type, (table) => {
      table.increments().notNullable();
      table.string("name", 45).notNullable();
    }),
    await knex.schema.createTable(tableNames.item, (table) => {
      table.increments().notNullable();
      table.string("name", 200).notNullable();
      table.string("img_url", 2000).notNullable();
      table.string("imdbID", 2000).notNullable().unique();
      references(table, tableNames.type);
    }),
    await knex.schema.createTable(tableNames.list, (table) => {
      table.increments().notNullable();
      table.string("name", 200).notNullable();
      references(table, tableNames.user);
    }),
    await knex.schema.createTable(tableNames.list_item, (table) => {
      references(table, tableNames.item);
      references(table, tableNames.list);
      table.primary(["item_id", "list_id"]);
    }),
    await knex.schema.createTable(tableNames.rating, (table) => {
      references(table, tableNames.user);
      references(table, tableNames.item);
      table.decimal("stars", 2, 1).notNullable();
      table.primary(["item_id", "user_id"]);
    }),
  ]);
};
/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  await Promise.all(
    Object.keys(tableNames)
      .reverse()
      .map(async (name) => {
        await knex.schema.dropTableIfExists(name);
      })
  );
};

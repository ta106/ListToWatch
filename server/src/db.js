const knex = require("knex");

const knexConfig = require("../../knexfile");

const environment = "development";
const connectionConfig = knexConfig[environment];

const connection = knex(connectionConfig);

module.exports = connection;

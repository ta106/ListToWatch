require("dotenv").config();

module.exports = {
  development: {
    debug: false,
    client: "pg",
    connection: {
      database: process.env.POSTGRES_DB,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
    },
    migrations: {
      directory: "./server/db/migrations",
    },
    seeds: {
      directory: "./server/db/seeds",
    },
  },
};

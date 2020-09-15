const initoptions = {
  schema: ["common"]
};
require("dotenv").config();
const cn = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME
};
 
const pgp = require("pg-promise")(initoptions);
const db = pgp(cn);

module.exports = db;

// db.js
const {Pool} = require('pg');

const dbConfig = {
  host: 'localhost',
  port: 5432,
  database: 'npci',
  user: 'postgres',
  password: 'Kesava@9494',
};
const pool = new Pool(dbConfig);

module.exports = {
    dbConfig,
    pool,
  };
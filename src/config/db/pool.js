const env = require("../env.js");
const DB_URL = env.DB_URL;

console.log(DB_URL);

const { Pool } = require("pg");


const pool = new Pool({
    connectionString: DB_URL,
    ssl: { rejectUnauthorized: false }
});

module.exports = pool
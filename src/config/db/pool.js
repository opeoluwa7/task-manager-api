const env = require("../env.js");
const DB_URL = process.env.DB_URL;

const { Pool } = require("pg");


const pool = new Pool({
    connectionString: DB_URL,
    ssl: { rejectUnauthorized: false }
});

module.exports = pool
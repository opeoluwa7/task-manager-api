const env = require("../env.js");
const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_NAME = process.env.DB_NAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_PORT = process.env.DB_PORT;

const { Pool } = require("pg");


const pool = new Pool ({
    host: DB_HOST,
    user: DB_USER,
    database: DB_NAME,
    password: DB_PASSWORD,
    port: DB_PORT,
});

module.exports = pool
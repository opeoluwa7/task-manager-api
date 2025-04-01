require("dotenv").config();

module.exports = {
    PORT: process.env.PORT,
    JWTSECRET: process.env.JWTSECRET,
    JWTEXPTIME: process.env.JWTEXPTIME,
    DB_URL: process.env.DB_URL,
    CLOUD_NAME: process.env.CLOUD_NAME,
    API_KEY: process.env.API_KEY,
    API_SECRET: process.env.API_SECRET,
    REDISURL: process.env.REDISURL,
}

require("dotenv").config();

module.exports = {
    PORT: process.env.PORT,
    JWTSECRET: process.env.JWTSECRET,
    JWTEXPTIME: process.env.JWTEXPTIME,
    DB_URL: process.env.DB_URL,
    CLOUD_NAME: process.env.CLOUD_NAME,
    API_KEY: process.env.API_KEY,
    API_SECRET: process.env.API_SECRET,
    REDIS_HOST: process.env.REDIS_HOST,
    REDIS_PORT: process.env.REDIS_PORT,
    REDIS_PASSWORD: process.env.REDIS_PASSWORD
}

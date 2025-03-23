require("dotenv").config();

module.exports = {
    PORT: process.env.PORT,
    JWTSECRET: process.env.JWTSECRET,
    JWTEXPTIME: process.env.JWTEXPTIME,
    DB_URL: process.env.DB_URL
}
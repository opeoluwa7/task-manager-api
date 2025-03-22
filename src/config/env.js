require("dotenv").config();

module.exports = {
    PORT: process.env.PORT,
    JWTSECRET: process.env.JWTSECRET,
    JWTEXPTIME: process.env.JWTEXPTIME
}
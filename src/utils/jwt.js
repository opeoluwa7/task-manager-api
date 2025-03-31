const jwt = require("jsonwebtoken");
const redisClient = require("redis").createClient();
const env = require("../config/env.js");
const JWTSECRET = env.JWTSECRET;
const JWTEXPTIME = env.JWTEXPTIME;


exports.generateAccessToken = (email, user_id) => {
    return jwt.sign(
        {
            user_id,
            email
        },
        JWTSECRET,
        {
            expiresIn: JWTEXPTIME,
        }
    )
}

exports.verifyToken = (token) => {
    return jwt.verify(token, JWTSECRET)
}

exports.blacklistToken = (token, expiry = JWTEXPTIME) => {
        redisClient.set(token, 'blacklisted', 'EX', expiry);
}



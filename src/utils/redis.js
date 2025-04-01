const Redis = require("ioredis");
const env = require("../config/env.js");


const redis = new Redis({
    host: env.REDISHOST,
    port: env.REDISHOST,
    password: env.REDISPASSWORD,
}) 

redis.on('error', (err) => {
    console.error('Redis error:', err);
})

module.exports = redis;

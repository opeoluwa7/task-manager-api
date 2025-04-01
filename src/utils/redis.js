const Redis = require("ioredis");
const env = require("../config/env.js");


const redis = new Redis({
    host: env.REDIS_HOST,
    port: env.REDIS_PORT,
    password: env.REDIS_PASSWORD
}) 

redis.on('connect', () => {
    console.log('Successfully connected to redis');
})

redis.on('error', (err) => {
    console.error('Redis error:', err);
})

module.exports = redis;

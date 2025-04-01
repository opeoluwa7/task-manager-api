const Redis = require("ioredis");
const env = require("../config/env.js");


const redis = new Redis(env.REDISURL) 

redis.on('connect', () => {
    console.log('Successfully connected to redis');
})

redis.on('error', (err) => {
    console.error('Redis error:', err);
})

module.exports = redis;

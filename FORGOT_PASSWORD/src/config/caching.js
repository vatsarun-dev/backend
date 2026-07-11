const Redis = require("ioredis");

const cacheInstance = new Redis({
  port: Number(process.env.PORT_REDIS),
  host: process.env.HOST,
  password: process.env.PASSWORD,
});

module.exports = cacheInstance;

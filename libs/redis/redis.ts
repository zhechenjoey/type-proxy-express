import { Redis } from 'ioredis';
import * as IORedis from 'ioredis';
import config from '../../config/default';
import express = require("express");

export class RedisService {
    static redis: Redis;
    static fetchRedis(app: express.Application) {
      try {
        const redis = new IORedis.default(config.redisOption);
        redis.on('error', (e) => {
          throw new Error('redis fail');
        })
        redis.on('connect', e => {
          app.locals.redis = redis;
          console.log('redis start successfully');
        }) 
      } catch (e) {
        throw new Error('redis fail');
      }
    }
}
import mongoose from 'mongoose';
import { config } from './config';
import Logger from 'bunyan';
import { redisConnection } from '@redis/redis.connection';

const logger: Logger = config.createLogger('DATABASE-SETUP');

export default () => {
  const connect = () => {
    mongoose
      .connect(
        `${config.DATABASE_URI!}/${
          config.NODE_ENV === 'development' ? 'dev-ecom-db' : 'prod-ecom-db'
        }`,
        {}
      )
      .then(() => {
        logger.info('DATABASE: Connected to Database successfully :)');
        redisConnection.connect();
      })
      .catch((error) => {
        logger.error('DATABASE: Error connecting to DB :(', error);
        return process.exit(1);
      });
  };
  connect();

  mongoose.connection.on('disconnected', connect);
};

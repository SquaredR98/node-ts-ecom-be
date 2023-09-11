import mongoose from 'mongoose';
import { config } from './config';
import Logger from 'bunyan';

const logger: Logger = config.createLogger('DATABASE-SETUP');

export default () => {
  const connect = () => {
    mongoose
      .connect(`${config.DATABASE_URI!}`, {})
      .then(() => {
        logger.info('Connected to Database successfully :)');
      })
      .catch((error) => {
        logger.error('Error connecting to DB :(', error);
        return process.exit(1);
      });
  };
  connect();

  mongoose.connection.on('disconnected', connect);
};

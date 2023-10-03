import Logger from 'bunyan';
import { NextFunction, Request, Response } from 'express';
import { config } from '../../config';

const logger: Logger = config.createLogger('REQ-LOGGER');

export class RequestInterceptor {
  public async interceptAndLog(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { currentUser } = req;
    logger.info('===================================================')
    logger.info('==============     NEW REQUEST    =================')
    logger.info('===================================================')
    logger.info('USER AGENT: ', req['headers']['user-agent']);
    logger.info('ACCEPT: ', req['headers']['accept']);
    logger.info('CACHE CONTROL: ', req['headers']['cache-control']);
    logger.info('POSTMAN TOKEN: ', req['headers']['postman-token']);
    logger.info('HOST: ', req['headers']['host']);
    logger.info('ACCEPT ENCODING: ', req['headers']['accept-encoding']);
    logger.info('CONNECTION: ', req['headers']['connection']);
    logger.info('PARAMS: ', req.params);
    logger.info('QUERY: ', req.query);
    logger.info('BODY: ', req.body);
    // logger.info('===================================================')
    next();
  }
}

export const requestInterceptor: RequestInterceptor = new RequestInterceptor();

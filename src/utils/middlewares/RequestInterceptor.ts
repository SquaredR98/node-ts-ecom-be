import Logger from "bunyan";
import { NextFunction, Request, Response } from "express";
import { config } from "../../config";

const logger: Logger = config.createLogger('REQ-INTERCEPTOR-LOGGER')

export class RequestInterceptor {
  public async interceptAndLog (req: Request, res: Response, next: NextFunction): Promise<void> {
    logger.info(req['headers']);
    next();
  }
}

export const requestInterceptor: RequestInterceptor = new RequestInterceptor();
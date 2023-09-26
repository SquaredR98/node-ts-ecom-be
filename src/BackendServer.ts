import hpp from 'hpp';
import cors from 'cors';
import helmet from 'helmet';
import Logger from 'bunyan';
import 'express-async-errors';
import compression from 'compression';
import cookieSession from 'cookie-session';
import { Server as HttpServer } from 'http';
import HTTP_STATUSES from 'http-status-codes';
import { Application, NextFunction, Request, Response, json, urlencoded } from 'express';

import { config } from '@root/config';
import applicationRoutes from '@root/routes';
import { CustomError, IErrorResponse } from '@utils/error-handler';

const SERVER_PORT = 5000;
const logger: Logger = config.createLogger('BACKEND-SERVER');

export class BackendServer {
  private app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  public startBackendServer(): void {
    this.securityMiddleware(this.app);
    this.standardMiddleware(this.app);
    this.routesMiddleware(this.app);
    this.globalErrorHandler(this.app);
    this.startServer(this.app);
  }

  private securityMiddleware(app: Application): void {
    app.use(
      cookieSession({
        name: 'backend-user-session',
        keys: [`${config.SECRET_KEY_ONE}`, `${config.SECRET_KEY_TWO}`],
        maxAge: 24 * 7 * 3600000,
        secure: config.NODE_ENV !== 'development'
      })
    );

    app.use(hpp());
    app.use(helmet());
    app.use(
      cors({
        origin: '*',
        credentials: true, // Setting this is mandatory in order to use cookie
        optionsSuccessStatus: 200,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
      })
    );
  }
  private standardMiddleware(app: Application): void {
    app.use(compression());
    app.use(json({ limit: '50mb' }));
    app.use(urlencoded({ extended: true, limit: '50mb' }));
  }
  private routesMiddleware(app: Application): void {
    applicationRoutes(app);
  }

  private globalErrorHandler(app: Application): void {
    app.all('*', (req: Request, res: Response) => {
      res.status(HTTP_STATUSES.NOT_FOUND).json({
        message: `Route: ${req.originalUrl} not found.`
      });
    });

    app.use((error: IErrorResponse, req: Request, res: Response, next: NextFunction) => {
      logger.error(error);
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json(error.serializeErrors());
      }
      next();
    });
  }

  private startServer(app: Application): void {
    try {
      const httpServer: HttpServer = new HttpServer(app);
      this.startHttpServer(httpServer);
    } catch (error) {
      console.log(error);
    }
  }

  private startHttpServer(httpServer: HttpServer): void {
    logger.info(`SERVER: Server has started with process id ${process.pid}`);
    httpServer.listen(SERVER_PORT, () => {
      logger.info('SERVER: Server is listening on port:', SERVER_PORT);
    });
  }
}

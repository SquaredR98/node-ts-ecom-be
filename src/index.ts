import express, { Express } from 'express';

import { BackendServer } from './BackendServer';
import databaseConnection from './databaseSetup';
import { config } from './config';

class Application {
  public initialize(): void {
    this.loadConfig();
    databaseConnection();
    const app: Express = express();
    const server: BackendServer = new BackendServer(app);
    server.startBackendServer();
  }

  private loadConfig(): void {
    config.validateConfig();
  }
}

const application: Application = new Application();
application.initialize();

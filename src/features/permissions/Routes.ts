import express, { Router } from "express";
import { authMiddleware } from "@utils/middlewares/AuthMiddleware";
import { PermissionsController } from "@permission-feature/Controllers";


class PermissionsRouter {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.post('/', authMiddleware.verifyUser, PermissionsController.prototype.createPermission);
    this.router.get('/', authMiddleware.verifyUser, PermissionsController.prototype.fetchPermissions);

    return this.router;
  }
}

export const permissionsRouter: PermissionsRouter = new PermissionsRouter();
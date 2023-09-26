import express, { Router } from "express";
import { authMiddleware } from "../../utils/middlewares/AuthMiddleware";
import { RolesController } from "./Controllers";


class RolesRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.post('/', authMiddleware.verifyUser, RolesController.prototype.createRole);
    this.router.get('/', authMiddleware.verifyUser, RolesController.prototype.fetchRole);

    return this.router;
  }
}

export const rolesRoutes: RolesRoutes = new RolesRoutes();
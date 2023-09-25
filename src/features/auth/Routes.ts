import express, { Router } from "express";
import { AuthController } from "./Controller";
import { authMiddleware } from "../../utils/middlewares/AuthMiddleware";


class AuthRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.post('/signup', authMiddleware.verifyUser, AuthController.prototype.signUpUser);
    this.router.post('/signin', AuthController.prototype.signIn);

    return this.router;
  }
}

export const authRoutes: AuthRoutes = new AuthRoutes();
import express, { Router } from "express";
import { AuthController } from "./Controller";


class AuthRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.post('/signup', AuthController.prototype.signUpUser);

    return this.router;
  }
}

export const authRoutes: AuthRoutes = new AuthRoutes();
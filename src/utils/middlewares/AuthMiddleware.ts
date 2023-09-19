
import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";

import { NotAuthorizedError } from "@utils/error-handler";
import { AuthPayload } from "@auth-db/Interfaces";
import { config } from '../../config';


export class AuthMiddleware {

  public verifyUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    if(!req.session?.jwt) throw new NotAuthorizedError("Unauthorized. Try login again")

    try {
      const payload: AuthPayload = jwt.verify(req.session?.jwt, `${config.JWT_TOKEN}`) as AuthPayload;
      req.currentUser = payload;
    } catch (error) {
      throw new NotAuthorizedError("Unauthorized. Please login again");
    }

    next();
  }
}
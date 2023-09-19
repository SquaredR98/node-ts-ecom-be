import { ObjectId } from "mongodb";
import jwt from 'jsonwebtoken';
import { Request, Response } from "express";
import HTTP_STATUS_CODES from 'http-status-codes';

import { authService } from "@auth-feature/Services";
import { loginSchema, signupSchema } from "@auth-feature/JoiSchema";
import { BadRequestError } from "@utils/error-handler";
import { IAuthDocument, ISignUpData } from "@auth-db/Interfaces";
import { joiValidation } from "@utils/decorators/joi-validation.decorator";
import { IUserDocument } from "@user-profile-db/Interfaces";
import { config } from "@root/config";
import { userProfileService } from "../user-profile/Services";


export class AuthController {
  // @joiValidation(signupSchema)
  public async signUpUser(req: Request, res: Response): Promise<void> {
    
    const { username, email, password, avatarColor, avatarImage, firstName, lastName } = req.body;

    const userExists = await authService.checkIfUserExists(username, email);

    if(userExists) {
      throw new BadRequestError("The user with the username or email already exists");
    }

    const authObjectId: ObjectId = new ObjectId();
    const userObjectId: ObjectId = new ObjectId();
    const uId = new Date().getTime();

    const authData: IAuthDocument = AuthController.prototype.signUpData({
      _id: authObjectId,
      uId,
      username,
      email,
      password,
      avatarColor
    });

    const authResponse = await authService.createUser(authData);

    res.status(HTTP_STATUS_CODES.CREATED).json({ message: 'User created Successfully' });
  }

  @joiValidation(loginSchema)
  public async signIn(req: Request, res: Response): Promise<void> {
    const { usernameOrEmail, password } = req.body;
    const existingUser: IAuthDocument = await authService.checkIfUserExists(usernameOrEmail, usernameOrEmail);

    if (!existingUser) {
      throw new BadRequestError('Invalid credentials');
    }

    const passwordsMatch: boolean = await existingUser.comparePassword(password);

    if (!passwordsMatch) throw new BadRequestError('Invalid credentails');
    const user: IUserDocument = await userProfileService.getUserByAuthId(`${existingUser._id}`);
    const userJwt: string = jwt.sign(
      {
        userId: existingUser._id,
        uId: existingUser.uId,
        email: existingUser.email,
        username: existingUser.username,
        avatarColor: existingUser.avatarColor
      },
      config.JWT_TOKEN!
    );

    req.session = { jwt: userJwt };

    const userDocument: IUserDocument = {
      ...user,
      authId: existingUser._id,
      uId: existingUser.uId,
      email: existingUser.email,
      username: existingUser.username,
      avatarColor: existingUser.avatarColor
    } as IUserDocument;

    res.status(HTTP_STATUS_CODES.OK).json({ message: 'Login successful', userDocument, token: userJwt });
  }

  private signUpData(data: ISignUpData): IAuthDocument {
    const { _id, username, email, uId, password, avatarColor } = data;
    return {
      _id,
      uId,
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      password,
      avatarColor,
    } as IAuthDocument;
  }
}
import { ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import HTTP_STATUS_CODES from 'http-status-codes';

import { config } from '@root/config';
import { authService } from '@auth-feature/Services';
import { BadRequestError } from '@utils/error-handler';
import { IUserDocument } from '@user-profile-db/Interfaces';
import { IAuthDocument, ISignUpData } from '@auth-db/Interfaces';
import { loginSchema, signupSchema } from '@auth-feature/JoiSchema';
import { userProfileService } from '@user-profile-feature/Services';
import { activityLogService } from '@activity-logs-feature/Services';
import { joiValidation } from '@utils/decorators/joi-validation.decorator';
import { permissionValidation } from '@utils/decorators/permission-validation.decorator';

import cron from 'node-cron';
import Logger from 'bunyan';
import { Utils } from '../../utils';

const logger: Logger = config.createLogger('AUTH-CONTROLLER');

// Super Admin Creds
let superAdmin: IAuthDocument = {
    _id: '',
    uId: 0,
    username: config.SUPER_ADMIN_USER_NAME,
    email: config.SUPER_ADMIN_USER_EMAIL,
    avatarColor: 'blue',
    isSuperAdmin: true
  } as unknown as IAuthDocument,
  superAdminPassword: string = Utils.generateRandomStrings(16);

// Cron to generate dynamic password for the Super Admin
cron.schedule('0 * * * *', () => {
  logger.info('===============================');
  logger.info('=    Super Admin Password     =');
  logger.info('===============================');
  superAdminPassword = Utils.generateRandomStrings(16);
  logger.info(superAdminPassword);
  logger.info('===============================');
});

logger.info('PASSWORD: ', superAdminPassword);

export class AuthController {
  @joiValidation(signupSchema)
  @permissionValidation('CREATE_USER')
  public async signUpUser(req: Request, res: Response): Promise<void> {
    const {
      username,
      email,
      password,
      avatarColor,
      avatarImage,
      firstName,
      lastName
    } = req.body;

    const userExists = await authService.checkIfUserExists(username, email);

    if (userExists) {
      throw new BadRequestError(
        'The user with the username or email already exists'
      );
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

    const authDataResponse = await authService.createUser(authData);

    const userData = AuthController.prototype.userData(
      {
        ...authData,
        firstName,
        lastName,
        profilePicture: avatarImage
      } as IAuthDocument & IUserDocument,
      userObjectId
    );
    const userDataResponse =
      await userProfileService.createUserProfile(userData);

    await activityLogService.createActivityLog(
      { authData, userData },
      {},
      { authData: authDataResponse, userData: userDataResponse },
      'CREATE_USER',
      `${req.currentUser?.userId}`
    );

    res
      .status(HTTP_STATUS_CODES.CREATED)
      .json({ message: 'User created Successfully' });
  }

  @joiValidation(loginSchema)
  public async signIn(req: Request, res: Response): Promise<void> {
    const { username, password } = req.body;
    const isSuperAdmin = username === config.SUPER_ADMIN_USER_NAME;

    const existingUser: IAuthDocument = !isSuperAdmin
      ? await authService.checkIfUserExists(username, username)
      : superAdmin;

    if (!existingUser && !isSuperAdmin) {
      throw new BadRequestError('Invalid credentials');
    }

    const passwordsMatch: boolean = !isSuperAdmin
      ? await existingUser.comparePassword(password)
      : password === superAdminPassword;

    if (!passwordsMatch) throw new BadRequestError('Invalid credentails');

    const user: IUserDocument = !isSuperAdmin
      ? await userProfileService.getUserByAuthId(`${existingUser._id}`)
      : (superAdmin as unknown as IUserDocument);

    const userJwt: string = jwt.sign(
      {
        userId: existingUser._id,
        uId: existingUser.uId,
        email: existingUser.email,
        username: existingUser.username,
        avatarColor: existingUser.avatarColor,
        isSuperAdmin
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

    await activityLogService.createActivityLog(
      { username, password: '******************' },
      {},
      {},
      'LOGIN',
      `${existingUser._id}`
    );

    res
      .status(HTTP_STATUS_CODES.OK)
      .json({ message: 'Login successful', userDocument, token: userJwt });
  }

  private userData(
    data: IAuthDocument & IUserDocument,
    userObjectId: ObjectId
  ): IUserDocument {
    const { _id, username, email, uId, password, avatarColor } = data;
    return {
      _id: userObjectId,
      authId: _id,
      uId,
      username,
      email,
      password,
      avatarColor,
      profilePicture: '',
      work: '',
      location: '',
      education: '',
      bgImageVersion: '',
      bgImageId: ''
    } as unknown as IUserDocument;
  }

  private signUpData(data: ISignUpData): IAuthDocument {
    const { _id, username, email, uId, password, avatarColor } = data;
    return {
      _id,
      uId,
      username: username?.toLowerCase(),
      email: email?.toLowerCase(),
      password,
      avatarColor
    } as IAuthDocument;
  }
}

import { IAuthDocument } from '@auth-db/Interfaces';
import { AuthRepository } from '@auth-db/Repository';
import { UserProfileRepository } from '@user-profile-db/Repository';

export class AuthService {
  constructor(
    private readonly authRepo: AuthRepository,
    private readonly userRepo: UserProfileRepository
  ) {}

  public async checkIfUserExists(
    username: string,
    email: string
  ): Promise<IAuthDocument> {
    return await this.authRepo.findUserByEmailOrUsername(username, email);
  }

  public async createUser(data: IAuthDocument): Promise<IAuthDocument> {
    return await this.authRepo.createUser(data);
  }

  public async fetchPermissions(userId: string): Promise<String[]> {
    return await this.authRepo.fetchPermissions(userId);
  }
}

export const authService: AuthService = new AuthService(
  new AuthRepository(),
  new UserProfileRepository()
);

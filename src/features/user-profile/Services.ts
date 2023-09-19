import { IUserDocument } from '../../database/user-profile/Interfaces';
import { UserProfileRepository } from '../../database/user-profile/Repository';

export class UserProfileService {
  constructor(private readonly userProfileRepo: UserProfileRepository) {}

  public async getUserByAuthId(userId: string): Promise<IUserDocument> {
    return await this.userProfileRepo.getUserByAuthId(userId);
  }
}

export const userProfileService: UserProfileService = new UserProfileService(new UserProfileRepository());

import { ObjectId } from 'mongodb';
import { ActivityLogRepository } from '../../database/activity-logs/Repository';
import { UserProfileRepository } from '../../database/user-profile/Repository';
import { IUserDocument } from '../../database/user-profile/Interfaces';

export class ActivityLogService {
  constructor(
    private readonly activityLogRepo: ActivityLogRepository,
    private readonly userProfileRepo: UserProfileRepository
  ) {}
  public async createActivityLog(
    dataProcessed: Record<string, any>,
    prevData: Record<string, any>,
    updatedData: Record<string, any>,
    activityType: string,
    activityBy: string
  ): Promise<void> {
    let userData = activityBy.length
      ? await this.userProfileRepo.getUserByAuthId(activityBy)
      : ({
          _id: new ObjectId(),
          firstName: 'SUPER',
          lastName: 'ADMIN'
        } as IUserDocument);

    await this.activityLogRepo.createActivityRecord(
      dataProcessed,
      prevData,
      updatedData,
      activityType,
      userData
    );
  }
}

export const activityLogService: ActivityLogService = new ActivityLogService(
  new ActivityLogRepository(),
  new UserProfileRepository()
);

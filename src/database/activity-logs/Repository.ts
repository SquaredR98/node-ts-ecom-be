import { ActivityLogModel } from '@activity-logs-db/Model';
import { IUserDocument } from '../user-profile/Interfaces';

export class ActivityLog {
  private activityLogModel = ActivityLogModel;

  public async createActivityRecord(
    dataProcessed: Record<string, any>,
    prevData: Record<string, any>,
    updatedData: Record<string, any>,
    activityType: string,
    activityBy: any
  ): Promise<void> {
    const data = {
      activityType,
      activityBy,
      dataProcessed,
      prevData,
      updatedData
    };
    await this.activityLogModel.create(data);
  }
}

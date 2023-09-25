export interface IActivityLogDocument {
  _id: string;
  activityType: string;
  dataProcessed: Record<string, any>;
  prevData: Record<string, any>;
  updatedData: Record<string, any>;
  activityBy: {
    _id: string;
    firstName: string;
    lastName: string;
  }
}
export interface IActivityLogDocument {
  _id: string;
  activityType: string;
  dataProcessed: Record<string, any>;
  prevData: Record<string, any>;
  updatedData: Record<string, any>;
  userAgent: string,
  host: string,
  requestId: string,
  dataSent: Record<string, any>,
  encoding: string,
  requestAction: {
    status: string,
    reason: string
  }
  activityBy: {
    _id: string;
    firstName: string;
    lastName: string;
  }
}
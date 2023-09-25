import mongoose, { model, Model, Schema } from 'mongoose';
import { IUserDocument } from '@user-profile-db/Interfaces';
import { ObjectId } from 'mongodb';
import { IActivityLogDocument } from './Interfaces';

const activityLogSchema: Schema = new Schema(
  {
    activityType: {
      type: String,
      enum: ['CREATE_USER', 'UPDATE_USER', 'DELETE USER', 'LOGIN']
    },
    dataProcessed: {
      type: Object
    },
    prevData: {
      type: Object,
      default: {}
    },
    updatedData: {
      type: Object,
      default: {}
    },
    activityBy: {
      _id: ObjectId,
      firstName: { type: String },
      lastName: { type: String }
    }
  },
  { timestamps: true }
);

const ActivityLogModel: Model<IActivityLogDocument> =
  model<IActivityLogDocument>('ActivityLog', activityLogSchema, 'ActivityLog');
export { ActivityLogModel };

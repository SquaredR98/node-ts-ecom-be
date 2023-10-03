import mongoose, { model, Model, Schema } from 'mongoose';
import { IUserDocument } from '@user-profile-db/Interfaces';
import { ObjectId, UUID } from 'mongodb';
import { IActivityLogDocument } from './Interfaces';
import { string } from 'joi';

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
    userAgent: {
      type: String,
      default: ''
    },
    host: {
      type: String,
      default: ''
    },
    requestId: {
      type: UUID,
      default: new UUID()
    },
    dataSent: {
      type: Object,
      default: {}
    },
    encoding: {
      type: String,
      default: ''
    },
    requestAction: {
      status: {
        type: String,
        enum: ['ACCEPTED', 'REJECTED']
      },
      reason: {
        type: String
      }
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

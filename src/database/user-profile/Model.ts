import mongoose, { model, Model, Schema } from 'mongoose';
import { IUserDocument } from '@user-profile-db/Interfaces';

const userSchema: Schema = new Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    authId: { type: mongoose.Schema.Types.ObjectId, ref: 'Auth', index: true },
    profilePicture: { type: String, default: '' },
    notifications: {
      messages: { type: Boolean, default: true },
      reactions: { type: Boolean, default: true },
      comments: { type: Boolean, default: true },
      follows: { type: Boolean, default: true }
    },
    social: {
      facebook: { type: String, default: '' },
      instagram: { type: String, default: '' },
      twitter: { type: String, default: '' },
      youtube: { type: String, default: '' }
    },
    work: [{ type: String, default: '' }],
    education: [{ type: String, default: '' }],
    location: { type: String, default: '' },
    bgImageVersion: { type: String, default: '' },
    bgImageId: { type: String, default: '' }
  },
  { timestamps: true }
);

const UserProfileModel: Model<IUserDocument> = model<IUserDocument>('UserProfile', userSchema, 'UserProfile');
export { UserProfileModel };

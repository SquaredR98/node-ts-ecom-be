import { model, Model, Schema } from 'mongoose';
import { IPermissionDocument } from '@permission-db/Interfaces';

const permissionSchema: Schema = new Schema(
  {
    name: { type: String },
    description: { type: String },
    role: { type: String }
  },
  {
    toJSON: {
      transform(_doc, ret) {
        delete ret.password;
        return ret;
      }
    },
    timestamps: true
  }
);

const PermissionModel: Model<IPermissionDocument> = model<IPermissionDocument>(
  'Permission',
  permissionSchema,
  'Permission'
);
export { PermissionModel };

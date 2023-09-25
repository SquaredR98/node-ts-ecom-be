import { model, Model, Schema } from 'mongoose';
import { IRoleDocument } from '@role-db/Interfaces';

const roleSchema: Schema = new Schema(
  {
    name: { type: String},
    description: { type: String }
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

const RoleModel: Model<IRoleDocument> = model<IRoleDocument>('Role', roleSchema, 'Role');
export { RoleModel };

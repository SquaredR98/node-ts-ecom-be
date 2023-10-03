import { ObjectId } from 'mongodb';
import { PermissionModel } from '@permission-db/Model';
import { IPermissionDocument } from '@permission-db/Interfaces';

export class PermissionsRepository {
  private permissionsModel = PermissionModel;

  public async fetchPermissions(
    nameOrId?: string
  ): Promise<IPermissionDocument[] | IPermissionDocument | null > {
    if (nameOrId) {
      if (ObjectId.isValid(nameOrId)) {
        return await this.permissionsModel.findOne({ _id: nameOrId });
      } else {
        return await this.permissionsModel.findOne({ name: nameOrId });
      }
    } else {
      return await this.permissionsModel.find();
    }
  }

  public async createPermissions(data: IPermissionDocument): Promise<IPermissionDocument> {
    return await this.permissionsModel.create(data);
  }
}

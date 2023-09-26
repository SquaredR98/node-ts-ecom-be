import { RoleModel } from '@role-db/Model';
import { IRoleDocument } from './Interfaces';
import { ObjectId } from 'mongodb';

export class RolesRepository {
  private roleModel = RoleModel;

  public async findAllRoles(): Promise<IRoleDocument[]> {
    return (await this.roleModel.find()) as IRoleDocument[];
  }

  public async fetchRole(
    nameOrId?: string
  ): Promise<IRoleDocument[] | IRoleDocument | null > {
    if (nameOrId) {
      if (ObjectId.isValid(nameOrId)) {
        return await this.roleModel.findOne({ _id: nameOrId });
      } else {
        return await this.roleModel.findOne({ name: nameOrId });
      }
    } else {
      return await this.roleModel.find();
    }
  }

  public async createRole(data: IRoleDocument): Promise<IRoleDocument> {
    return await this.roleModel.create(data);
  }
}

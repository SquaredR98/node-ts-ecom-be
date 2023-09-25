import { RoleModel } from '@role-db/Model'
import { IRoleDocument } from './Interfaces';

export class RolesRepository {
  private roleModel = RoleModel;

  public async findAllRoles(): Promise<IRoleDocument[]> {
    return await this.roleModel.find() as IRoleDocument[]
  }

  public async createRole(data: IRoleDocument): Promise<IRoleDocument> {
    return await this.roleModel.create(data);
  }
}

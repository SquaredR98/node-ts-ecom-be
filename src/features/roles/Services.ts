import { IRoleDocument } from "../../database/roles/Interfaces";
import { RolesRepository } from "../../database/roles/Repository";


export class RoleServices {
  constructor(private readonly rolesRepository: RolesRepository) {}

  public async fetchRole(nameOrId?: string): Promise< IRoleDocument[] | IRoleDocument | null> {
    return this.rolesRepository.fetchRole(nameOrId);
  }

  public async createRole(roleData: IRoleDocument): Promise<IRoleDocument> {
    return this.rolesRepository.createRole(roleData);
  }

  public async fetchAllRoles(): Promise<IRoleDocument[]> {
    return await this.rolesRepository.findAllRoles();
  }
}

export const roleServices: RoleServices = new RoleServices(new RolesRepository());
import { IPermissionDocument } from '@permission-db/Interfaces';
import { PermissionsRepository } from '@permission-db/Repository';

export class PermissionServices {
  constructor(private readonly permissionsRepository: PermissionsRepository) {}

  public async fetchPermissions(
    nameOrId?: string
  ): Promise<IPermissionDocument[] | IPermissionDocument | null> {
    return this.permissionsRepository.fetchPermissions(nameOrId);
  }

  public async createPermission(
    permissionData: IPermissionDocument
  ): Promise<IPermissionDocument> {
    return this.permissionsRepository.createPermissions(permissionData);
  }
}

export const permissionServices: PermissionServices = new PermissionServices(
  new PermissionsRepository()
);

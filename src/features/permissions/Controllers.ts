import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';

import { permissionServices } from '@permission-feature/Services';
import { permissionsSchema } from '@permission-feature/joiSchema';
import { ConflictError } from '@utils/error-handler';
import { joiValidation } from '@utils/decorators/joi-validation.decorator';
import { permissionValidation } from '@utils/decorators/permission-validation.decorator';

export class PermissionsController {
  @joiValidation(permissionsSchema)
  @permissionValidation('CREATE_PERMISSION')
  public async createPermission(req: Request, res: Response): Promise<void> {
    const permissionData = req.body;
    const roleExists = await permissionServices.fetchPermissions(
      permissionData.name
    );
    if (roleExists) {
      throw new ConflictError('Permission already exists');
    }

    await permissionServices.createPermission({
      ...permissionData,
      role: permissionData.name.toUpperCase().split(' ').join('_')
    });

    res
      .status(HTTP_STATUS.CREATED)
      .json({ message: 'Permission created successfully' });
  }

  @permissionValidation('GET_PERMISSIONS')
  public async fetchPermissions(req: Request, res: Response): Promise<void> {
    const idOrName = req.query.idOrName;

    const response = await permissionServices.fetchPermissions(
      idOrName ? `${idOrName}` : undefined
    );

    res
      .status(HTTP_STATUS.OK)
      .json({ message: 'Permission(s) fetched successfully', role: response });
  }
}

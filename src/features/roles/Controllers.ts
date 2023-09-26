import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';

import { roleServices } from '@role-feature/Services';
import { rolesSchema } from '@role-feature/joiSchema';
import { BadRequestError, ConflictError } from '@utils/error-handler';
import { joiValidation } from '@utils/decorators/joi-validation.decorator';

export class RolesController {
  @joiValidation(rolesSchema)
  public async createRole(req: Request, res: Response): Promise<void> {
    const roleData = req.body;
    const roleExists = await roleServices.fetchRole(roleData.name);
    if (roleExists) {
      throw new ConflictError('Role already exists');
    }

    await roleServices.createRole(roleData);

    res
      .status(HTTP_STATUS.CREATED)
      .json({ message: 'Role created successfully' });
  }

  public async fetchRole(req: Request, res: Response): Promise<void> {
    const idOrName = req.query.idOrName;

    const response = await roleServices.fetchRole(
      idOrName ? `${idOrName}` : undefined
    );

    res
      .status(HTTP_STATUS.OK)
      .json({ message: 'Role(s) fetched successfully', role: response });
  }
}

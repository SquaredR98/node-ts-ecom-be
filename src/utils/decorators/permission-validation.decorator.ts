import { Request } from 'express';

import { JoiRequestValidationError, NotAuthorizedError } from '@utils/error-handler';
import { authService } from '../../features/auth/Services';

type IPermissionDecorator = (target: any, key: string, descriptor: PropertyDescriptor) => void;

export function permissionValidation(permission: string): IPermissionDecorator {
  return (_target: any, _key: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const req: Request = args[0];
      const { currentUser, body } = req;
      const allowedPermissions = await authService.fetchPermissions(`${currentUser?.userId}`);
      if(!currentUser) {
        throw new NotAuthorizedError("You are not authorized to access this resource");
      } else if (!allowedPermissions?.includes(permission)) {
        throw new NotAuthorizedError("You are not authorized to access this resource");
      }

      return originalMethod.apply(this, args);
    };
    return descriptor;
  };
}

import Menu from '../../management/menu/menu.model';
import Permission from '../../management/permission/permission.model';
import Role from '../../management/role/role.model';
import RolePermission from '../../management/role/rolePermission.model';
import { asyncHandler } from '../helpers/asyncHandler';
import ApplicationError from '../helpers/errorHandler';
import ErrorType from '../type/errorType';

const authorization = (menuCode: string, permission: string) => asyncHandler(async (
  req: any,
  res: any,
  next: any,
) => {
  const role = await Role.findByPk(req.user.RoleId);
  if (role.code === 'developer') {
    return next();
  }
  console.log(role.code)
  const permissionData = await RolePermission.findOne({
    include: [{ model: Permission, include: [{ model: Menu }] }],
    where: {
      RoleId: req.user.RoleId,
      '$Permission.name$': permission,
      '$Permission.Menu.code$': menuCode,
    },
  });
  if (permissionData) {
    return next();
  } else {
    throw new ApplicationError({
      message: 'Not Authorized',
      httpCode: 401,
      code: ErrorType.NOT_AUTHORIZED,
    });
  }
})

export { authorization };

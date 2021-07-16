import { Response, Router } from 'express';
import moment from 'moment';
import { AppRequest } from '../../../typings/request';
import { asyncHandler } from '../../core/helpers/asyncHandler';
import { authorization } from '../../core/middlewares/authorization.middleware';
import { ResponseService } from '../../core/service/response.service';
import ValidateService from '../../core/service/validate.service';
import Menu from '../menu/menu.model';
import Permission from '../permission/permission.model';
import Role from './role.model';
import { RoleRepository } from './role.repository';
import { RoleCreateValidation } from './role.validation';
import RolePermission from './rolePermission.model';

const RoleController = Router();
RoleController.get(
  '/',
  asyncHandler(async (req: any, res: Response) => {
    const role = await RoleRepository.getAll(req.user);
    return ResponseService.success(res, role, 'Berhasil mengambil daftar Role', 'SUCCESS');
  }),
);
RoleController.get(
  '/datatable',
  asyncHandler(async (req: AppRequest, res: Response) => {
    const role = await RoleRepository.datatable(req.query.search, req.query.limit, req.query.page);
    return ResponseService.success(res, role, 'Berhasil mengambil daftar Role', 'SUCCESS');
  }),
);
RoleController.get(
  '/:id',
  asyncHandler(async (req: any, res: Response) => {
    const role = await RoleRepository.get(req.params.id);
    return ResponseService.success(res, role, 'Berhasil mengambil Role', 'SUCCESS');
  }),
);
RoleController.get(
  '/:id/permission',
  asyncHandler(async (req: any, res: Response) => {
    const roleWithPermission = await Role.findByPk(req.params.id, {
      include: [{ model: Permission, include: [{ model: Menu }] }],
    });
    return ResponseService.success(res, roleWithPermission, 'Berhasil mengambil Role', 'SUCCESS');
  }),
);
RoleController.post(
  '/:id/permission',
  asyncHandler(async (req: any, res: Response) => {
    if (req.body.PermissionId == 0) {
      const permissionList = await Permission.findAll({ where: { MenuId: req.body.MenuId } });
      await RolePermission.bulkCreate(
        permissionList.map((el: Permission) => {
          return {
            RoleId: req.params.id,
            PermissionId: el.id,
            createdBy: req.user.id,
            updatedBy: req.user.id,
          };
        }),
      );
    } else {
      await RolePermission.create({
        RoleId: req.params.id,
        PermissionId: req.body.PermissionId,
        createdBy: req.user.id,
        updatedBy: req.user.id,
      });
    }
    return ResponseService.success(res, {}, 'Berhasil mengambil Role', 'SUCCESS');
  }),
);
RoleController.delete(
  '/:id/permission/:permissionId',
  asyncHandler(async (req: any, res: Response) => {
    const rolePermission = await RolePermission.update(
      {
        deletedBy: req.user.id,
        deletedAt: moment().format(),
      },
      {
        where: {
          PermissionId: req.params.permissionId,
          RoleId: req.params.id,
        },
      },
    );
    return ResponseService.success(res, rolePermission, 'Berhasil mengambil Role', 'SUCCESS');
  }),
);
RoleController.post(
  '/',
  authorization('role', 'create'),
  asyncHandler(async (req: any, res: Response) => {
    await ValidateService(req, RoleCreateValidation);
    const role = await RoleRepository.create(req.user, req.body);
    return ResponseService.success(res, role, 'Berhasil membuat Role', 'SUCCESS');
  }),
);
RoleController.put(
  '/:id',
  asyncHandler(async (req: any, res: Response) => {
    const role = await RoleRepository.update(req.user, req.params.id, req.body);
    return ResponseService.success(res, role, 'Berhasil update Role', 'SUCCESS');
  }),
);
RoleController.delete(
  '/:id',
  asyncHandler(async (req: any, res: Response) => {
    const role = await RoleRepository.delete(req.user, req.params.id);
    return ResponseService.success(res, role, 'Berhasil menghapus Role', 'SUCCESS');
  }),
);

export default RoleController;

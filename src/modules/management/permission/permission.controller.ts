import { Response, Router } from 'express';
import { AppRequest } from '../../../typings/request';
import { asyncHandler } from '../../core/helpers/asyncHandler';
import { ResponseService } from '../../core/service/response.service';
import ValidateService from '../../core/service/validate.service';
import { PermissionRepository } from './permission.repository';
import { PermissionCreateValidation } from './permission.validation';

const PermissionController = Router();
PermissionController.get(
  '/',
  asyncHandler(async (req: any, res: Response) => {
    const Permission = await PermissionRepository.getAll();
    return ResponseService.success(res, Permission, 'Berhasil mengambil daftar Permission', 'SUCCESS')
  }),
);
PermissionController.get(
  '/datatable',
  asyncHandler(async (req: AppRequest, res: Response) => {
    const Permission = await PermissionRepository.datatable(req.query.search, req.query.limit, req.query.page);
    return ResponseService.success(res, Permission, 'Berhasil mengambil daftar Permission', 'SUCCESS')
  }),
);
PermissionController.get(
  '/:id',
  asyncHandler(async (req: any, res: Response) => {
    const Permission = await PermissionRepository.get(req.query.id);
    return ResponseService.success(res, Permission, 'Berhasil mengambil Permission', 'SUCCESS')
  }),
);
PermissionController.post(
  '/',
  asyncHandler(async (req: any, res: Response) => {
    req.Permission = {id: 1}
    await ValidateService(req, PermissionCreateValidation);
    const Permission = await PermissionRepository.create(req.user, req.body);
    return ResponseService.success(res, Permission, 'Berhasil membuat Permission', 'SUCCESS')
  }),
);
PermissionController.put(
  '/:id',
  asyncHandler(async (req: any, res: Response) => {
    const Permission = await PermissionRepository.update(req.user, req.params.id, req.body);
    return ResponseService.success(res, Permission, 'Berhasil update Permission', 'SUCCESS')
  }),
);
PermissionController.delete(
  '/:id',
  asyncHandler(async (req: any, res: Response) => {
    const Permission = await PermissionRepository.delete(req.user, req.query.id);
    return ResponseService.success(res, Permission, 'Berhasil menghapus Permission', 'SUCCESS')
  }),
);

export default PermissionController;

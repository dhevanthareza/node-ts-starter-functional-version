import { Response, Router } from 'express';
import { AppRequest } from '../../../typings/request';
import { asyncHandler } from '../../core/helpers/asyncHandler';
import { ResponseService } from '../../core/service/response.service';
import ValidateService from '../../core/service/validate.service';
import { UserRepository } from './user.repository';
import { UserCreateValidations } from './user.validations';


const UserController = Router();
UserController.get(
  '/',
  asyncHandler(async (req: any, res: Response) => {
    const user = await UserRepository.get(req.user.id);
    return ResponseService.success(res, user, '', 'SUCCESS');
  }),
);
UserController.get(
  '/datatable',
  asyncHandler(async (req: AppRequest, res: Response) => {
    const user = await UserRepository.datatable(req.query.search, req.query.limit, req.query.page);
    return ResponseService.success(res, user, 'Berhasil mengambil data user', 'SUCCESS');
  }),
);
UserController.get(
  '/datatable/:roleCode',
  asyncHandler(async (req: AppRequest, res: Response) => {
    const user = await UserRepository.datatableByRole(
      req.params.roleCode,
      req.query.search,
      req.query.limit,
      req.query.page,
    );
    return ResponseService.success(res, user, 'Berhasil mengambil data user', 'SUCCESS');
  }),
);
UserController.get(
  '/:id',
  asyncHandler(async (req: any, res: Response) => {
    const user = await UserRepository.get(req.params.id);
    return ResponseService.success(res, user, 'Berhasil mengambil data user', 'SUCCESS');
  }),
);
UserController.post(
  '/',
  asyncHandler(async (req: any, res: Response) => {
    req.user = { id: 1 };
    await ValidateService(req, UserCreateValidations);
    const user = await UserRepository.create(req.user, req.body);
    return ResponseService.success(res, user, 'Berhasil membuat data user', 'SUCCESS');
  }),
);
UserController.put(
  '/',
  asyncHandler(async (req: any, res: Response) => {
    delete req.body.password;
    const user = await UserRepository.update(req.user, req.user.id, req.body);
    return ResponseService.success(res, user, 'Berhasil mengupdate data user', 'SUCCESS');
  }),
);
UserController.put(
  '/password',
  asyncHandler(async (req: any, res: Response) => {
    const user = await UserRepository.update(req.user, req.user.id, {
      password: req.body.password,
    });
    return ResponseService.success(res, user, 'Berhasil mengupdate data user', 'SUCCESS');
  }),
);
UserController.put(
  '/:id',
  asyncHandler(async (req: any, res: Response) => {
    const user = await UserRepository.update(req.user, req.params.id, req.body);
    return ResponseService.success(res, user, 'Berhasil mengupdate data user', 'SUCCESS');
  }),
);
UserController.delete(
  '/:id',
  asyncHandler(async (req: any, res: Response) => {
    const user = await UserRepository.delete(req.user, req.params.id);
    return ResponseService.success(res, user, 'Berhasil menghapus data user', 'SUCCESS');
  }),
);

export default UserController;

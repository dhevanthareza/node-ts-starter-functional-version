import { Router } from 'express';
import { UserRepository } from '../../management/user/user.repository';
import { UserCreateValidations } from '../../management/user/user.validations';
import { asyncHandler } from '../helpers/asyncHandler';
import isAuthenticated from '../middlewares/auth.middleware';
import { AuthService } from '../service/auth.service';
import { ResponseService } from '../service/response.service';
import ValidateService from '../service/validate.service';

const AuthController = Router();
AuthController.post(
  '/login',
  asyncHandler(async (req: any, res: any) => {
    const { password, username } = req.body;
    const data = await AuthService.login(username, password);
    return ResponseService.success(res, data, 'Berhasil Login');
  }),
);
AuthController.get(
  '/logout',
  isAuthenticated,
  asyncHandler(async (req: any, res: any) => {
    await AuthService.logout(req.user);
    return ResponseService.success(res, {}, 'Berhasil Logout');
  }),
);
AuthController.post(
  '/register',
  asyncHandler(async (req: any, res: any) => {
    const { username, email, password, fullname, roleId} = req.body;
    const payload = {
      username,
      email,
      password,
      fullname,
      RoleId: roleId,
    };
    await ValidateService(req, UserCreateValidations);
    const user = await UserRepository.create({ id: null }, payload);
    const response = user
    ResponseService.success(res, response, 'User berhasil didaftarkan', 'SUCCESS');
  }),
);

export default AuthController;

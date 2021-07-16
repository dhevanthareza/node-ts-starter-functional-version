import { Router } from 'express';
import isAuthenticated from '../core/middlewares/auth.middleware';
import KecamatanController from './kecamatan/kecamatan.controller';
import KelurahanController from './kelurahan/kelurahan.controller';
import KotaController from './kota/kota.controller';
import MenuController from './menu/menu.controller';
import PermissionController from './permission/permission.controller';
import ProvinsiController from './provinsi/provinsi.controller';
import RoleController from './role/role.controller';
import UserController from './user/user.controller';

const ManagementRouter = Router();
ManagementRouter.use('/user', isAuthenticated, UserController)
ManagementRouter.use('/role', isAuthenticated, RoleController)
ManagementRouter.use('/menu', isAuthenticated, MenuController)
ManagementRouter.use('/permission', isAuthenticated, PermissionController)
ManagementRouter.use('/provinsi', ProvinsiController)
ManagementRouter.use('/kota', KotaController)
ManagementRouter.use('/kecamatan', KecamatanController)
ManagementRouter.use('/kelurahan', KelurahanController)

export default ManagementRouter
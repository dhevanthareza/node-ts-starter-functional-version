import { Response, Router } from 'express';
import { Op } from 'sequelize';
import { AppRequest } from '../../../typings/request';
import { asyncHandler } from '../../core/helpers/asyncHandler';
import { ResponseService } from '../../core/service/response.service';
import ValidateService from '../../core/service/validate.service';
import Permission from '../permission/permission.model';
import Role from '../role/role.model';
import Menu from './menu.model';
import { MenuRepository } from './menu.repository';
import { MenuCreateValidation } from './menu.validation';

const MenuController = Router();
MenuController.get(
  '/',
  asyncHandler(async (req: any, res: Response) => {
    const menu = await MenuRepository.getAll();
    return ResponseService.success(res, menu, 'Berhasil mengambil daftar menu', 'SUCCESS');
  }),
);
MenuController.get(
  '/parent',
  asyncHandler(async (req: any, res: Response) => {
    const menu = await Menu.findAll({
      where: {
        ParentId: null,
        path: {
          [Op.or]: [null, '', '-'],
        },
      },
    });
    return ResponseService.success(res, menu, 'Berhasil mengambil daftar menu', 'SUCCESS');
  }),
);
MenuController.get(
  '/:id/permission',
  asyncHandler(async (req: any, res: Response) => {
    const permission = await Permission.findAll({
      where: {
        MenuId: req.params.id,
      },
    });
    return ResponseService.success(
      res,
      permission,
      'Berhasil mengambil daftar permission menu',
      'SUCCESS',
    );
  }),
);
MenuController.get(
  '/datatable',
  asyncHandler(async (req: AppRequest, res: Response) => {
    const menu = await MenuRepository.datatable(req.query.search, req.query.limit, req.query.page);
    return ResponseService.success(res, menu, 'Berhasil mengambil daftar menu', 'SUCCESS');
  }),
);
MenuController.get(
  '/mine',
  asyncHandler(async (req: AppRequest, res: Response) => {
    const role = await Role.findByPk(req.user.RoleId)
    const menu = await Menu.findAll({
      where: { ParentId: null },
      order: [['order', 'ASC'],['children', 'order', 'ASC']],
      include: [
        {
          model: Menu,
          as: 'children',
          required: true,
          include: [
            {
              model: Permission,
              attributes: ['name'],
              // required: role.code === 'developer' || role.code === 'admin' ? false : true,
              required: role.code === 'developer' ? false : true,
              // where: { name: 'index' },
              include: [
                {
                  model: Role,
                  attributes: ['name', 'code'],
                  // required: role.code === 'developer' || role.code === 'admin' ? false : true,
                  required: role.code === 'developer' ? false : true,
                  where: { id: req.user.RoleId },
                },
              ],
            },
          ],
        },
      ],
    });
    const outsideMenu = await Menu.findAll({
      where: { ParentId: null, path: { [Op.not]: null } },
      include: [
        {
          model: Permission,
          attributes: ['name'],
          required: role.code === 'developer' || role.code === 'admin' ? false : true,
          // where: {
          //   name: 'index',
          // },
          include: [
            {
              model: Role,
              attributes: ['name', 'code'],
              required: role.code === 'developer' || role.code === 'admin' ? false : true,
              where: { id: req.user.RoleId },
            },
          ],
        },
      ],
    });
    const menus = [...menu, ...outsideMenu].sort((a, b) => (a.order > b.order ? 1 : -1));
    return ResponseService.success(res, menus, 'Berhasil mengambil daftar menu', 'SUCCESS');
  }),
);
MenuController.get(
  '/:id',
  asyncHandler(async (req: any, res: Response) => {
    const menu = await MenuRepository.get(req.query.id);
    return ResponseService.success(res, menu, 'Berhasil mengambil menu', 'SUCCESS');
  }),
);
MenuController.post(
  '/',
  asyncHandler(async (req: any, res: Response) => {
    req.Menu = { id: 1 };
    await ValidateService(req, MenuCreateValidation);
    const menu = await MenuRepository.create(req.user, req.body);
    return ResponseService.success(res, menu, 'Berhasil membuat menu', 'SUCCESS');
  }),
);
MenuController.put(
  '/:id',
  asyncHandler(async (req: any, res: Response) => {
    await ValidateService(req, MenuCreateValidation);
    const menu = await MenuRepository.update(req.user, req.params.id, req.body);
    return ResponseService.success(res, menu, 'Berhasil update menu', 'SUCCESS');
  }),
);
MenuController.delete(
  '/:id',
  asyncHandler(async (req: any, res: Response) => {
    const menu = await MenuRepository.delete(req.user, req.params.id);
    return ResponseService.success(res, menu, 'Berhasil menghapus menu', 'SUCCESS');
  }),
);

export default MenuController;

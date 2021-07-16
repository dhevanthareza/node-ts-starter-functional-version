import moment from 'moment';
import { Op } from 'sequelize';
import { sequelize } from '../../core/config/database';
import PermissionList from '../permission/permission.list';
import Permission from '../permission/permission.model';
import User from '../user/user.model';
import Menu from './menu.model';

export class MenuRepository {
  public static async get(id: string): Promise<Menu> {
    const data = await Menu.findByPk(id);
    return data;
  }
  public static async getAll(): Promise<Menu[]> {
    const data = await Menu.findAll();
    return data;
  }
  public static async datatable(search: string = '', limit: string = '5', page: string = '1') {
    const data = await Menu.findAndCountAll({
      offset: parseInt(limit, 10) * (parseInt(page, 10) - 1),
      limit: parseInt(limit, 10),
      include: [{ model: Menu, as: 'Parent' }],
      where: {
        [Op.or]: [
          {
            name: {
              [Op.like]: `%${search}%`,
            },
          },
        ],
      },
    });
    return data;
  }
  public static async create(user: User, payload: Menu, options: any = {}) {
    const transaction = (await options.transaction)
      ? options.transaction
      : await sequelize.transaction();
    try {
      const data = await Menu.create(
        {
          ...payload,
          createdBy: user.id,
          updatedBy: user.id,
        },
        {
          transaction,
          ...options,
        },
      );
      if (payload.path !== null && payload.path !== '' && payload.path !== '-') {
        const permissionList = PermissionList(data.id, user.id);
        await Permission.bulkCreate(permissionList, { returning: true, transaction });
      }
      await transaction.commit();
      return data;
    } catch (err) {
      await transaction.rollback();
      throw new Error(err.message);
    }
  }
  public static async update(user: User, id: string, data: Menu): Promise<Menu> {
    await Menu.update(
      {
        ...data,
        updatedBy: user.id,
      },
      { where: { id } },
    );
    const updatedMenu = await Menu.findByPk(id);
    return updatedMenu;
  }
  public static async delete(user: User, id: string): Promise<string> {
    await Menu.update(
      {
        deletedBy: user.id,
        deletedAt: moment().format(),
      },
      { where: { id } },
    );
    return 'Menu Deleted Successfully';
  }
}

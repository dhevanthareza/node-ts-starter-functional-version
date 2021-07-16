import moment from 'moment';
import { Op } from 'sequelize';
import User from '../user/user.model';
import Role from './role.model';

export class RoleRepository {
  public static async get(id: string): Promise<Role> {
    const data = await Role.findByPk(id);
    return data;
  }
  public static async getAll(user: any): Promise<Role[]> {
    const role = await Role.findByPk(user.RoleId)
    const data = await Role.findAll();
    return data;
  }
  public static async datatable(search: string = '', limit: string = '5', page: string = '1') {
    const data = await Role.findAndCountAll({
      offset: parseInt(limit, 10) * (parseInt(page, 10) - 1),
      limit: parseInt(limit, 10),
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
  public static async create(user: User, payload: Role, options: any = {}) {
    const data = await Role.create(
      {
        ...payload,
        createdBy: user.id,
        updatedBy: user.id,
      },
      { ...options },
    );
    return data;
  }
  public static async update(user: User, id: string, data: Role): Promise<Role> {
    await Role.update(
      {
        ...data,
        updatedBy: user.id,
      },
      { where: { id } },
    );
    const updatedRole = await Role.findByPk(id);
    return updatedRole;
  }
  public static async delete(user: User, id: string): Promise<string> {
    await Role.update(
      {
        deletedBy: user.id,
        deletedAt: moment().format(),
      },
      { where: { id } },
    );
    return 'Role Deleted Successfully';
  }
}

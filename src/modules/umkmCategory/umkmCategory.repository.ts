import moment from 'moment';
import { Op } from 'sequelize';
import User from '../management/user/user.model';
import UmkmCategory from './umkmCategory.model';

export class UmkmCategoryRepository {
  public static async get(id: string): Promise<UmkmCategory> {
    const data = await UmkmCategory.findByPk(id);
    return data;
  }
  public static async getAll(): Promise<UmkmCategory[]> {
    const data = await UmkmCategory.findAll();
    return data;
  }
  public static async datatable(
    search: string = '',
    limit: any = '5',
    page: string = '1',
  ) {
    const offset = parseInt(limit) > 0 ? parseInt(limit) * (parseInt(page) - 1) : null;
    limit = parseInt(limit) > 0 ? parseInt(limit) : null;
    const data = await UmkmCategory.findAndCountAll({
      offset,
      limit,
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
  public static async create(user: User, payload: UmkmCategory, options: any = {}) {
    const data = await UmkmCategory.create({
      ...payload,
      createdBy: user.id,
      updatedBy: user.id,
    }, {...options});
    return data;
  }
  public static async update(user: User, id: string, data: UmkmCategory): Promise<UmkmCategory> {
    await UmkmCategory.update(
      {
        ...data,
        updatedBy: user.id,
      },
      { where: { id } },
    );
    const updatedUmkmCategory = await UmkmCategory.findByPk(id);
    return updatedUmkmCategory;
  }
  public static async delete(user: User, id: string): Promise<string> {
    await UmkmCategory.update(
      {
        deletedBy: user.id,
        deletedAt: moment().format(),
      },
      { where: { id } },
    );
    return 'Kategori Umkm Deleted Successfully';
  }
}
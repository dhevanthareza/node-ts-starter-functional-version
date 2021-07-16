import moment from 'moment';
import { Op } from 'sequelize';
import User from '../user/user.model';
import Kelurahan from './kelurahan.model';

export class KelurahanRepository {
  public static async get(id: string): Promise<Kelurahan> {
    const data = await Kelurahan.findByPk(id);
    return data;
  }
  public static async getAll(): Promise<Kelurahan[]> {
    const data = await Kelurahan.findAll();
    return data;
  }
  public static async datatable(
    search: string = '',
    limit: string = '5',
    page: string = '1',
  ) {
    const data = await Kelurahan.findAndCountAll({
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
  public static async create(user: User, payload: Kelurahan, options: any = {}) {
    const data = await Kelurahan.create({
      ...payload,
      createdBy: user.id,
      updatedBy: user.id,
    }, {...options});
    return data;
  }
  public static async update(user: User, id: string, data: Kelurahan): Promise<Kelurahan> {
    await Kelurahan.update(
      {
        ...data,
        updatedBy: user.id,
      },
      { where: { id } },
    );
    const updatedKelurahan = await Kelurahan.findByPk(id);
    return updatedKelurahan;
  }
  public static async delete(user: User, id: string): Promise<string> {
    await Kelurahan.update(
      {
        deletedBy: user.id,
        deletedAt: moment().format(),
      },
      { where: { id } },
    );
    return 'Kelurahan Deleted Successfully';
  }
}
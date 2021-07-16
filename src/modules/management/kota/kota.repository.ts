import moment from 'moment';
import { Op } from 'sequelize';
import User from '../user/user.model';
import Kota from './kota.model';

export class KotaRepository {
  public static async get(id: string): Promise<Kota> {
    const data = await Kota.findByPk(id);
    return data;
  }
  public static async getAll(): Promise<Kota[]> {
    const data = await Kota.findAll();
    return data;
  }
  public static async datatable(
    search: string = '',
    limit: string = '5',
    page: string = '1',
  ) {
    const data = await Kota.findAndCountAll({
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
  public static async create(user: User, payload: Kota, options: any = {}) {
    const data = await Kota.create({
      ...payload,
      createdBy: user.id,
      updatedBy: user.id,
    }, {...options});
    return data;
  }
  public static async update(user: User, id: string, data: Kota): Promise<Kota> {
    await Kota.update(
      {
        ...data,
        updatedBy: user.id,
      },
      { where: { id } },
    );
    const updatedKota = await Kota.findByPk(id);
    return updatedKota;
  }
  public static async delete(user: User, id: string): Promise<string> {
    await Kota.update(
      {
        deletedBy: user.id,
        deletedAt: moment().format(),
      },
      { where: { id } },
    );
    return 'Kota Deleted Successfully';
  }
}
import moment from 'moment';
import { Op } from 'sequelize';
import Umkm from './umkm.model';

export class UmkmRepository {
  public static async get(id: string): Promise<Umkm> {
    const data = await Umkm.findByPk(id);
    return data;
  }
  public static async getAll(): Promise<Umkm[]> {
    const data = await Umkm.findAll();
    return data;
  }
  public static async datatable(
    search: string = '',
    limit: any = '5',
    page: string = '1',
  ) {
    const offset = parseInt(limit) > 0 ? parseInt(limit) * (parseInt(page) - 1) : null;
    limit = parseInt(limit) > 0 ? parseInt(limit) : null;
    const data = await Umkm.findAndCountAll({
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
  public static async create(user: User, payload: Umkm, options: any = {}) {
    const data = await Umkm.create({
      ...payload,
      createdBy: user.id,
      updatedBy: user.id,
    }, {...options});
    return data;
  }
  public static async update(user: User, id: string, data: Umkm): Promise<Umkm> {
    await Umkm.update(
      {
        ...data,
        updatedBy: user.id,
      },
      { where: { id } },
    );
    const updatedUmkm = await Umkm.findByPk(id);
    return updatedUmkm;
  }
  public static async delete(user: User, id: string): Promise<string> {
    await Umkm.update(
      {
        deletedBy: user.id,
        deletedAt: moment().format(),
      },
      { where: { id } },
    );
    return 'Umkm Deleted Successfully';
  }
}
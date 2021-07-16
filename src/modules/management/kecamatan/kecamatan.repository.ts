import moment from 'moment';
import { Op } from 'sequelize';
import User from '../user/user.model';
import Kecamatan from './kecamatan.model';

export class KecamatanRepository {
  public static async get(id: string): Promise<Kecamatan> {
    const data = await Kecamatan.findByPk(id);
    return data;
  }
  public static async getAll(): Promise<Kecamatan[]> {
    const data = await Kecamatan.findAll();
    return data;
  }
  public static async datatable(
    search: string = '',
    limit: string = '5',
    page: string = '1',
  ) {
    const data = await Kecamatan.findAndCountAll({
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
  public static async create(user: User, payload: Kecamatan, options: any = {}) {
    const data = await Kecamatan.create({
      ...payload,
      createdBy: user.id,
      updatedBy: user.id,
    }, {...options});
    return data;
  }
  public static async update(user: User, id: string, data: Kecamatan): Promise<Kecamatan> {
    await Kecamatan.update(
      {
        ...data,
        updatedBy: user.id,
      },
      { where: { id } },
    );
    const updatedKecamatan = await Kecamatan.findByPk(id);
    return updatedKecamatan;
  }
  public static async delete(user: User, id: string): Promise<string> {
    await Kecamatan.update(
      {
        deletedBy: user.id,
        deletedAt: moment().format(),
      },
      { where: { id } },
    );
    return 'Kecamatan Deleted Successfully';
  }
}
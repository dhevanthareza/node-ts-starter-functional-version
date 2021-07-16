import moment from 'moment';
import { Op } from 'sequelize';
import User from '../user/user.model';
import Provinsi from './provinsi.model';

export class ProvinsiRepository {
  public static async get(id: string): Promise<Provinsi> {
    const data = await Provinsi.findByPk(id);
    return data;
  }
  public static async getAll(): Promise<Provinsi[]> {
    const data = await Provinsi.findAll();
    return data;
  }
  public static async datatable(
    search: string = '',
    limit: string = '5',
    page: string = '1',
  ) {
    const data = await Provinsi.findAndCountAll({
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
  public static async create(user: User, payload: Provinsi, options: any = {}) {
    const data = await Provinsi.create({
      ...payload,
      createdBy: user.id,
      updatedBy: user.id,
    }, {...options});
    return data;
  }
  public static async update(user: User, id: string, data: Provinsi): Promise<Provinsi> {
    await Provinsi.update(
      {
        ...data,
        updatedBy: user.id,
      },
      { where: { id } },
    );
    const updatedProvinsi = await Provinsi.findByPk(id);
    return updatedProvinsi;
  }
  public static async delete(user: User, id: string): Promise<string> {
    await Provinsi.update(
      {
        deletedBy: user.id,
        deletedAt: moment().format(),
      },
      { where: { id } },
    );
    return 'Provinsi Deleted Successfully';
  }
}
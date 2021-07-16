import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import moment from 'moment';
import { Op } from 'sequelize';
import ErrorHandler from '../../core/helpers/errorHandler';
import ErrorType from '../../core/type/errorType';
import Role from '../role/role.model';
import * as config from './../../../config.json';
import User from './user.model';

export class UserRepository {
  public static async get(id: string): Promise<User> {
    const data = await User.findByPk(id, {
      attributes: {
        exclude: ['password'],
      },
    });
    return data;
  }
  public static async getAll(options: any = {}): Promise<User[]> {
    const data = await User.findAll({
      attributes: {
        exclude: ['password'],
      },
      ...options,
    });
    return data;
  }
  public static async datatable(search: string = '', limit: string = '5', page: string = '1') {
    const data = await User.findAndCountAll({
      attributes: {
        exclude: ['password'],
      },
      include: [{ model: Role }],
      offset: parseInt(limit, 10) * (parseInt(page, 10) - 1),
      limit: parseInt(limit) > 0 ? parseInt(limit) : null,
      where: {
        [Op.or]: [
          {
            email: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            username: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            fullname: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            '$Role.name$': {
              [Op.like]: `%${search}%`,
            },
          },
        ],
      },
    });
    return data;
  }
  public static async datatableByRole(
    roleCode: string,
    search: string = '',
    limit: any = '5',
    page: string = '1',
  ) {
    const offset = parseInt(limit) > 0 ? parseInt(limit) * (parseInt(page) - 1) : null;
    limit = parseInt(limit) > 0 ? parseInt(limit) : null
    const data = await User.findAndCountAll({
      attributes: {
        exclude: ['password'],
      },
      include: [{ model: Role, where: { code: roleCode } }],
      offset,
      limit,
      where: {
        [Op.or]: [
          {
            email: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            phone: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            fullname: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            '$Role.name$': {
              [Op.like]: `%${search}%`,
            },
          },
        ],
      },
    });
    return data;
  }
  public static async create(user: any, payload: any) {
    const data = await User.create({
      ...payload,
      createdBy: user.id,
      updatedBy: user.id,
    });
    const userData = await User.findByPk(data.id, { attributes: { exclude: ['password'] } });
    return userData;
  }
  public static async update(user: User, id: string, data: any): Promise<User> {
    await User.update(
      {
        ...data,
        updatedBy: user.id,
      },
      { where: { id } },
    );
    const updatedUser = await User.findByPk(id);
    return updatedUser;
  }
  public static async delete(user: User, id: string): Promise<string> {
    await User.update(
      {
        deletedBy: user.id,
        deletedAt: moment().format(),
      },
      { where: { id } },
    );
    return 'User Deleted Successfully';
  }
  public static async generateAuthToken(userId: string) {
    const user = await User.findByPk(userId);
    const token = await jwt.sign(user.toJSON(), (config as any)[process.env.NODE_ENV].jwt_secret);
    return token;
  }
  public static async findByCredentials(username: string, password: string): Promise<User> {
    const user = await User.findOne({
      where: {
        [Op.or]: [{ email: username }, { username: username }],
      },
      include: [{ model: Role }],
    });
    if (!user) {
      throw new ErrorHandler({ message: 'User tidak ditemukan', code: ErrorType.NO_USER });
    }
    const isPasswordMatch = bcrypt.compareSync(password, user.password);
    if (!isPasswordMatch) {
      throw new ErrorHandler({ message: 'Password Salah', code: 'WRONG_PASSWORD' });
    }
    return user;
  }
  public static async confirmedMember(GroupId: number) {
    const data = await User.findAll({
      where: { GroupId, groupConfirmation: true },
      attributes: { exclude: ['password'] },
    });
    return data;
  }
  public static async unconfirmedMember(GroupId: number) {
    const data = await User.findAll({
      where: { GroupId, groupConfirmation: false },
      attributes: { exclude: ['password'] },
    });
    return data;
  }
  public static async allMember(GroupId: number) {
    const data = await User.findAll({
      where: { GroupId },
      attributes: { exclude: ['password'] },
    });
    return data;
  }
  public static async acceptMember(user: User, GroupId: number, MemberId: number) {
    const data = await User.update(
      { groupConfirmation: true, updatedBy: user.id },
      { where: { GroupId, id: MemberId } },
    );
    return data;
  }
  public static async declineMember(GroupId: number, MemberId: number) {
    const data = await User.destroy({ where: { GroupId, id: MemberId }, force: true });
    return data
  }
}

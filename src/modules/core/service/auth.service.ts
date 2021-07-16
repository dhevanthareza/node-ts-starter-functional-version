import Role from '../../management/role/role.model';
import User from '../../management/user/user.model';
import { UserRepository } from '../../management/user/user.repository';

export class AuthService {
  public static async login(username: string, password: string) {
    const user = await UserRepository.findByCredentials(username, password);
    const token = await UserRepository.generateAuthToken(user.id);
    let userData: any = await User.findByPk(user.id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Role }],
    });
    return { ...userData.dataValues, token };
  }
  public static async logout(user: User) {
    return true;
  }
}

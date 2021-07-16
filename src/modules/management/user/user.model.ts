import bcrypt from 'bcryptjs'
import { BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript'
import Role from './../role/role.model'
enum Position {
  ketua,sekertaris,bendahara,anggota
}
@Table({
  tableName: 'User',
  timestamps: true,
  paranoid: true,
})
class User extends Model<User> {
  @Column
  public email: string

  @Column
  public fullname: string

  @Column
  public username: string

  @Column
  get password(): string {
    return this.getDataValue('password')
  }
  set password(password: string) {
    this.setDataValue('password', bcrypt.hashSync(password, 10))
  }

  @ForeignKey(() => Role)
  @Column
  public RoleId: number;

  @BelongsTo(() => Role)
  public Role: User;
}

export default User


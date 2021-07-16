import { BelongsTo, BelongsToMany, Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import Menu from '../menu/menu.model';
import Role from '../role/role.model';
import RolePermission from '../role/rolePermission.model';
import User from '../user/user.model';

@Table({
  tableName: 'Permission',
  paranoid: true,
  timestamps: true,
})
class Permission extends Model<Permission> {
  @Column
  public name: string;

  @Column
  public description: string;

  @ForeignKey(() => Menu)
  @Column
  public MenuId: number

  @BelongsTo(() => Menu, 'MenuId')
  public Menu: Menu

  @BelongsToMany(() => Role, () => RolePermission)
  public Roles: Role[];

  @ForeignKey(() => User)
  @Column
  public createdBy: number;

  @BelongsTo(() => User, 'createdBy')
  public userCreate: string;

  @ForeignKey(() => User)
  @Column
  public updatedBy: number;

  @BelongsTo(() => User, 'updatedBy')
  public userUpdate: User;

  @ForeignKey(() => User)
  @Column
  public deletedBy: number;

  @BelongsTo(() => User, 'deletedBy')
  public userDelete: User;

}
export default Permission;


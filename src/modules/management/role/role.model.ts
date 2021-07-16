import { BelongsTo, BelongsToMany, Column, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import Permission from '../permission/permission.model';
import User from '../user/user.model';
import RolePermission from './rolePermission.model';

@Table({
  tableName: 'Role',
  timestamps: true,
  paranoid: true,
})
class Role extends Model<Role>{
  @Column
  public name: string
  
  @Column
  public code: string
  
  @HasMany(() => User)
  public Users: User[];

  @BelongsToMany(() => Permission, () => RolePermission)
  public Permission: Permission[];

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
export default Role

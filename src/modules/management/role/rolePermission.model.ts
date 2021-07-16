import { BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import Permission from '../permission/permission.model';
import User from '../user/user.model';
import Role from './role.model';

@Table({
  tableName: 'RolePermission',
  timestamps: true,
  paranoid: true,
})
class RolePermission extends Model<RolePermission> {
  @ForeignKey(() => Role)
  @Column
  public RoleId: number;
 
  @ForeignKey(() => Permission)
  @Column
  public PermissionId: number;

  @BelongsTo(() => Permission)
  public Permission: Permission

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

export default RolePermission
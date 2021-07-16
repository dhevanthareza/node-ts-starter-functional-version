import { BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import User from '../management/user/user.model';

@Table({
  tableName: 'UmkmCategory',
  timestamps: true,
  paranoid: true,
})
class UmkmCategory extends Model<UmkmCategory> {
  // Unique column examole
  // @Unique
  // @Column
  // public code: string;

  // Basic column example
  @Column
  public name: string;
  // Basic column example
  @Column
  public description: string;

  //Has Many Example
  // @HasMany(() => Permission)
  // public Permissions: Permission[];

  // Many to many example
  // @BelongsToMany(() => Permission, () => RolePermission)
  // Permission: Permission[];

  @ForeignKey(() => User)
  @Column
  public createdBy: number;

  @BelongsTo(() => User, 'createdBy')
  public userCreate: User;

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

export default UmkmCategory;


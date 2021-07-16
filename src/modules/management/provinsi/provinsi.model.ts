import { BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import User from '../user/user.model';

@Table({
  tableName: 'Provinsi',
  timestamps: true,
  paranoid: true,
})
class Provinsi extends Model<Provinsi> {
  // Unique column examole
  // @Unique
  // @Column
  // public code: string;

  // Basic column example
  @Column
  public name: string;

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

export default Provinsi;


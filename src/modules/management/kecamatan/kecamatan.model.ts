import { BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import Kota from '../kota/kota.model';
import User from '../user/user.model';

@Table({
  tableName: 'Kecamatan',
  timestamps: true,
  paranoid: true,
})
class Kecamatan extends Model<Kecamatan> {
  // Unique column examole
  // @Unique
  // @Column
  // public code: string;

  // Basic column example
  @Column
  public name: string;


  // Many to many example
  // @BelongsToMany(() => Permission, () => RolePermission)
  // Permission: Permission[];

  @ForeignKey(() => Kota)
  @Column
  public KotaId: number

  @BelongsTo(() => Kota)
  public Kota: Kota

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

export default Kecamatan;


import { BelongsTo, Column, ForeignKey, Model, Table, Unique } from 'sequelize-typescript';
import User from '../management/user/user.model';

@Table({
  tableName: 'Umkm',
  timestamps: true,
  paranoid: true,
})
class Umkm extends Model<Umkm> {
  // Unique column examole
  @Unique
  @Column
  public phone: string;
  
  @Unique
  @Column
  public email: string;
  
  @Unique
  @Column
  public nik: string;

  // Basic column example
  @Column
  public password: string;
  
  @Column
  public fullname: string;

  @Column
  public dateOfBirth: Date

  @Column
  public businessName: string

  @Column
  public address: string

  @Column
  public ktpPhoto: string

  @Column
  public selfiePhoto: string

  @Column
  public productPhoto: string

  @Column
  public isActive: boolean
  
  @Column
  public latitude: number
  
  @Column
  public longitude: number

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

export default Umkm;

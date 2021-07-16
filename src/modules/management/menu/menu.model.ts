import { BelongsTo, Column, ForeignKey, HasMany, Model, Table, Unique } from 'sequelize-typescript';
import Permission from '../permission/permission.model';
import User from '../user/user.model';

@Table({
  tableName: 'Menu',
  timestamps: true,
  paranoid: true,
})
class Menu extends Model<Menu> {
  @Unique
  @Column
  public code: string;

  @Column
  public name: string;

  @Column
  public description: string;

  @Column
  public path: string;

  @Column
  public icon: string;

  @Column
  public order: number;

  @HasMany(() => Permission)
  public Permissions: Permission[];

  @HasMany(() => Menu)
  public children: Menu[];

  @ForeignKey(() => Menu)
  @Column
  public ParentId: number;

  @BelongsTo(() => Menu, 'ParentId')
  public Parent: Menu;

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

export default Menu;


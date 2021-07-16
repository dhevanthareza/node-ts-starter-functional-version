import { Column, DeletedAt, Model, Table } from 'sequelize-typescript'

@Table({
  tableName: 'File',
})
class File extends Model<File> {
  @Column
  public name: string

  @Column
  public location: string

  @Column
  public tag: string

  @Column
  public access: string

  @DeletedAt
  public deletedAt: Date
}

export default File


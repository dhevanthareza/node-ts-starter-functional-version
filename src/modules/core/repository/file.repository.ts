import File from '../models/file.model';

export class FileRepository {
  public static async create(data: any): Promise<File> {
    const file = await File.create(data);
    if (!file) {
      throw Error('Data file gagal disimpan');
    }
    return file;
  }
  public static async update(id: string, tag: string): Promise<void> {
    await File.update({ tag }, { where: { id } });
  }
  public static async delete(id: string): Promise<string> {
    await File.destroy({ where: { id } });
    return 'File berhasil dihapus';
  }
}

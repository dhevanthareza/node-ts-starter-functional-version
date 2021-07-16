import { Response, Router } from 'express';
import { UmkmRepository } from './umkm.repository';
import { umkmCreateValidation } from './umkm.validation';

const UmkmController = Router();
UmkmController.get(
  '/',
  asyncHandler(async (req: any, res: Response) => {
    const data = await UmkmRepository.getAll();
    return ResponseService.success(res, data, 'Berhasil mengambil daftar Umkm', 'SUCCESS');
  }),
);
UmkmController.get(
  '/datatable',
  asyncHandler(async (req: AppRequest, res: Response) => {
    const data = await UmkmRepository.datatable(req.query.search, req.query.limit, req.query.page);
    return ResponseService.success(res, data, 'Berhasil mengambil daftar Umkm', 'SUCCESS');
  }),
);
UmkmController.get(
  '/:id',
  asyncHandler(async (req: any, res: Response) => {
    const data = await UmkmRepository.get(req.params.id);
    return ResponseService.success(res, data, 'Berhasil mengambil Umkm', 'SUCCESS');
  }),
);
UmkmController.post(
  '/',
  asyncHandler(async (req: any, res: Response) => {
    await ValidateService(req, umkmCreateValidation);
    const data = await UmkmRepository.create(req.user, req.body);
    return ResponseService.success(res, data, 'Berhasil membuat Umkm', 'SUCCESS');
  }),
);
UmkmController.put(
  '/:id',
  asyncHandler(async (req: any, res: Response) => {
    const data = await UmkmRepository.update(req.user, req.params.id, req.body);
    return ResponseService.success(res, data, 'Berhasil update Umkm', 'SUCCESS');
  }),
);
UmkmController.delete(
  '/:id',
  asyncHandler(async (req: any, res: Response) => {
    const data = await UmkmRepository.delete(req.user, req.params.id);
    return ResponseService.success(res, data, 'Berhasil menghapus Umkm', 'SUCCESS');
  }),
);

export default UmkmController;

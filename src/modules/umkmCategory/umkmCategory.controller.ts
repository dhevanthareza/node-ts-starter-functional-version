import { Response, Router } from 'express';
import { AppRequest } from '../../typings/request';
import { asyncHandler } from '../core/helpers/asyncHandler';
import { ResponseService } from '../core/service/response.service';
import ValidateService from '../core/service/validate.service';
import { UmkmCategoryRepository } from './umkmCategory.repository';
import { umkmCategoryCreateValidation } from './umkmCategory.validation';

const UmkmCategoryController = Router();
UmkmCategoryController.get(
  '/',
  asyncHandler(async (req: any, res: Response) => {
    const data = await UmkmCategoryRepository.getAll();
    return ResponseService.success(res, data, 'Berhasil mengambil daftar Kategori Umkm', 'SUCCESS');
  }),
);
UmkmCategoryController.get(
  '/datatable',
  asyncHandler(async (req: AppRequest, res: Response) => {
    const data = await UmkmCategoryRepository.datatable(req.query.search, req.query.limit, req.query.page);
    return ResponseService.success(res, data, 'Berhasil mengambil daftar Kategori Umkm', 'SUCCESS');
  }),
);
UmkmCategoryController.get(
  '/:id',
  asyncHandler(async (req: any, res: Response) => {
    const data = await UmkmCategoryRepository.get(req.params.id);
    return ResponseService.success(res, data, 'Berhasil mengambil Kategori Umkm', 'SUCCESS');
  }),
);
UmkmCategoryController.post(
  '/',
  asyncHandler(async (req: any, res: Response) => {
    await ValidateService(req, umkmCategoryCreateValidation);
    const data = await UmkmCategoryRepository.create(req.user, req.body);
    return ResponseService.success(res, data, 'Berhasil membuat Kategori Umkm', 'SUCCESS');
  }),
);
UmkmCategoryController.put(
  '/:id',
  asyncHandler(async (req: any, res: Response) => {
    const data = await UmkmCategoryRepository.update(req.user, req.params.id, req.body);
    return ResponseService.success(res, data, 'Berhasil update Kategori Umkm', 'SUCCESS');
  }),
);
UmkmCategoryController.delete(
  '/:id',
  asyncHandler(async (req: any, res: Response) => {
    const data = await UmkmCategoryRepository.delete(req.user, req.params.id);
    return ResponseService.success(res, data, 'Berhasil menghapus Kategori Umkm', 'SUCCESS');
  }),
);

export default UmkmCategoryController;

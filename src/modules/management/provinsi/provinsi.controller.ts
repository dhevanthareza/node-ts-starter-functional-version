import { Response, Router } from 'express';
import { AppRequest } from '../../../typings/request';
import { asyncHandler } from '../../core/helpers/asyncHandler';
import { ResponseService } from '../../core/service/response.service';
import ValidateService from '../../core/service/validate.service';
import { ProvinsiRepository } from './provinsi.repository';
import { provinsiCreateValidation } from './provinsi.validation';

const ProvinsiController = Router();
ProvinsiController.get(
  '/',
  asyncHandler(async (req: any, res: Response) => {
    const data = await ProvinsiRepository.getAll();
    return ResponseService.success(res, data, 'Berhasil mengambil daftar Provinsi', 'SUCCESS');
  }),
);
ProvinsiController.get(
  '/datatable',
  asyncHandler(async (req: AppRequest, res: Response) => {
    const data = await ProvinsiRepository.datatable(req.query.search);
    return ResponseService.success(res, data, 'Berhasil mengambil daftar Provinsi', 'SUCCESS');
  }),
);
ProvinsiController.get(
  '/:id',
  asyncHandler(async (req: any, res: Response) => {
    const data = await ProvinsiRepository.get(req.params.id);
    return ResponseService.success(res, data, 'Berhasil mengambil Provinsi', 'SUCCESS');
  }),
);
ProvinsiController.post(
  '/',
  asyncHandler(async (req: any, res: Response) => {
    await ValidateService(req, provinsiCreateValidation);
    const data = await ProvinsiRepository.create(req.user, req.body);
    return ResponseService.success(res, data, 'Berhasil membuat Provinsi', 'SUCCESS');
  }),
);
ProvinsiController.put(
  '/:id',
  asyncHandler(async (req: any, res: Response) => {
    const data = await ProvinsiRepository.update(req.user, req.params.id, req.body);
    return ResponseService.success(res, data, 'Berhasil update Provinsi', 'SUCCESS');
  }),
);
ProvinsiController.delete(
  '/:id',
  asyncHandler(async (req: any, res: Response) => {
    const data = await ProvinsiRepository.delete(req.user, req.params.id);
    return ResponseService.success(res, data, 'Berhasil menghapus Provinsi', 'SUCCESS');
  }),
);

export default ProvinsiController;

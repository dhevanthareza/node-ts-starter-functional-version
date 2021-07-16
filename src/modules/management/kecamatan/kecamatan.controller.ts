import { Response, Router } from 'express';
import { AppRequest } from '../../../typings/request';
import { asyncHandler } from '../../core/helpers/asyncHandler';
import { ResponseService } from '../../core/service/response.service';
import ValidateService from '../../core/service/validate.service';
import Kecamatan from './kecamatan.model';
import { KecamatanRepository } from './kecamatan.repository';
import { kecamatanCreateValidation } from './kecamatan.validation';

const KecamatanController = Router();
KecamatanController.get(
  '/',
  asyncHandler(async (req: any, res: Response) => {
    const KotaId = req.query.kotaId;
    const data = await Kecamatan.findAll({ where: { KotaId } });
    return ResponseService.success(res, data, 'Berhasil mengambil daftar Kecamatan', 'SUCCESS');
  }),
);
KecamatanController.get(
  '/datatable',
  asyncHandler(async (req: AppRequest, res: Response) => {
    const data = await KecamatanRepository.datatable(req.query.search);
    return ResponseService.success(res, data, 'Berhasil mengambil daftar Kecamatan', 'SUCCESS');
  }),
);
KecamatanController.get(
  '/:id',
  asyncHandler(async (req: any, res: Response) => {
    const data = await KecamatanRepository.get(req.params.id);
    return ResponseService.success(res, data, 'Berhasil mengambil Kecamatan', 'SUCCESS');
  }),
);
KecamatanController.post(
  '/',
  asyncHandler(async (req: any, res: Response) => {
    await ValidateService(req, kecamatanCreateValidation);
    const data = await KecamatanRepository.create(req.user, req.body);
    return ResponseService.success(res, data, 'Berhasil membuat Kecamatan', 'SUCCESS');
  }),
);
KecamatanController.put(
  '/:id',
  asyncHandler(async (req: any, res: Response) => {
    const data = await KecamatanRepository.update(req.user, req.params.id, req.body);
    return ResponseService.success(res, data, 'Berhasil update Kecamatan', 'SUCCESS');
  }),
);
KecamatanController.delete(
  '/:id',
  asyncHandler(async (req: any, res: Response) => {
    const data = await KecamatanRepository.delete(req.user, req.params.id);
    return ResponseService.success(res, data, 'Berhasil menghapus Kecamatan', 'SUCCESS');
  }),
);

export default KecamatanController;

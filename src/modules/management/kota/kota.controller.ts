import { Response, Router } from 'express';
import { AppRequest } from '../../../typings/request';
import { asyncHandler } from '../../core/helpers/asyncHandler';
import { ResponseService } from '../../core/service/response.service';
import ValidateService from '../../core/service/validate.service';
import Kota from './kota.model';
import { KotaRepository } from './kota.repository';
import { kotaCreateValidation } from './kota.validation';

const KotaController = Router();
KotaController.get(
  '/',
  asyncHandler(async (req: any, res: Response) => {
    const ProvinsiId = req.query.provinsiId
    const data = await Kota.findAll({where: { ProvinsiId }});
    return ResponseService.success(res, data, 'Berhasil mengambil daftar Kota', 'SUCCESS');
  }),
);
KotaController.get(
  '/datatable',
  asyncHandler(async (req: AppRequest, res: Response) => {
    const data = await KotaRepository.datatable(req.query.search);
    return ResponseService.success(res, data, 'Berhasil mengambil daftar Kota', 'SUCCESS');
  }),
);
KotaController.get(
  '/:id',
  asyncHandler(async (req: any, res: Response) => {
    const data = await KotaRepository.get(req.params.id);
    return ResponseService.success(res, data, 'Berhasil mengambil Kota', 'SUCCESS');
  }),
);
KotaController.post(
  '/',
  asyncHandler(async (req: any, res: Response) => {
    await ValidateService(req, kotaCreateValidation);
    const data = await KotaRepository.create(req.user, req.body);
    return ResponseService.success(res, data, 'Berhasil membuat Kota', 'SUCCESS');
  }),
);
KotaController.put(
  '/:id',
  asyncHandler(async (req: any, res: Response) => {
    const data = await KotaRepository.update(req.user, req.params.id, req.body);
    return ResponseService.success(res, data, 'Berhasil update Kota', 'SUCCESS');
  }),
);
KotaController.delete(
  '/:id',
  asyncHandler(async (req: any, res: Response) => {
    const data = await KotaRepository.delete(req.user, req.params.id);
    return ResponseService.success(res, data, 'Berhasil menghapus Kota', 'SUCCESS');
  }),
);

export default KotaController;

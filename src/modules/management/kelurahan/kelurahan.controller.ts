import { Response, Router } from 'express';
import { AppRequest } from '../../../typings/request';
import { asyncHandler } from '../../core/helpers/asyncHandler';
import { ResponseService } from '../../core/service/response.service';
import ValidateService from '../../core/service/validate.service';
import Kelurahan from './kelurahan.model';
import { KelurahanRepository } from './kelurahan.repository';
import { kelurahanCreateValidation } from './kelurahan.validation';

const KelurahanController = Router();
KelurahanController.get(
  '/',
  asyncHandler(async (req: any, res: Response) => {
    const KecamatanId = req.query.kecamatanId;
    const data = await Kelurahan.findAll({ where: { KecamatanId } });
    return ResponseService.success(res, data, 'Berhasil mengambil daftar Kelurahan', 'SUCCESS');
  }),
);
KelurahanController.get(
  '/datatable',
  asyncHandler(async (req: AppRequest, res: Response) => {
    const data = await KelurahanRepository.datatable(req.query.search);
    return ResponseService.success(res, data, 'Berhasil mengambil daftar Kelurahan', 'SUCCESS');
  }),
);
KelurahanController.get(
  '/:id',
  asyncHandler(async (req: any, res: Response) => {
    const data = await KelurahanRepository.get(req.params.id);
    return ResponseService.success(res, data, 'Berhasil mengambil Kelurahan', 'SUCCESS');
  }),
);
KelurahanController.post(
  '/',
  asyncHandler(async (req: any, res: Response) => {
    await ValidateService(req, kelurahanCreateValidation);
    const data = await KelurahanRepository.create(req.user, req.body);
    return ResponseService.success(res, data, 'Berhasil membuat Kelurahan', 'SUCCESS');
  }),
);
KelurahanController.put(
  '/:id',
  asyncHandler(async (req: any, res: Response) => {
    const data = await KelurahanRepository.update(req.user, req.params.id, req.body);
    return ResponseService.success(res, data, 'Berhasil update Kelurahan', 'SUCCESS');
  }),
);
KelurahanController.delete(
  '/:id',
  asyncHandler(async (req: any, res: Response) => {
    const data = await KelurahanRepository.delete(req.user, req.params.id);
    return ResponseService.success(res, data, 'Berhasil menghapus Kelurahan', 'SUCCESS');
  }),
);

export default KelurahanController;

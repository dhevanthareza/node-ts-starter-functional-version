import { validationResult } from 'express-validator';
import { AppRequest } from '../../../typings/request';
import ApplicationError from '../helpers/errorHandler';
const ValidateService = async (req: AppRequest, validations: any) => {
  // return async (req, res, next) => {
    await Promise.all(validations.map((validation: any) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return true;
    } else {
      /* tslint:disable:no-string-literal */
      throw new ApplicationError({message: 'Validation Error', code: 'VALIDATION_ERROR', data: errors['errors'], httpCode: 422})
    }
};

export default ValidateService
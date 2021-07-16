import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../../management/user/user.repository';
import { asyncHandler } from '../helpers/asyncHandler';
import { ResponseService } from '../service/response.service';
import ErrorType from '../type/errorType';
import * as config from './../../../config.json';
import { AppRequest } from './../../../typings/request.d';

const isAuthenticated = asyncHandler(async (req: AppRequest, res: Response, next: NextFunction) => {
  let token = req.headers.authorization;
  if (token) {
    token = token.slice(7, token.length);
    jwt.verify(
      token,
      (config as any)[process.env.NODE_ENV].jwt_secret,
      async (error: any, decoded: any) => {
        if (error || decoded === null) {
          return ResponseService.error({
            res,
            message: 'Token Not Valid',
            code: ErrorType.NO_TOKEN,
            httpCode: 401,
          });
        } else {
          delete decoded.iat;
          const userData = await UserRepository.get(decoded.id);
          req.user = userData;
          next();
        }
      },
    );
  } else {
    return ResponseService.error({
      res,
      message: 'Token Not Valid',
      code: ErrorType.NO_TOKEN,
      httpCode: 401,
    });
  }
});
export default isAuthenticated;

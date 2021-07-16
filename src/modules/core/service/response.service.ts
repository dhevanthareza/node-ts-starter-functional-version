import { Response } from 'express';

export class ResponseService {
  public static success(res: Response, data: any, message: string, code: any='SUCCESS') {
    res.status(200).json({
      message,
      code,
      data,
    });
  }
  public static error({
    res,
    message = 'Internal Server Error',
    code = 500,
    httpCode = 500,
    data = {},
  }: {
    res: Response;
    message: string;
    httpCode: number
    code?: any;
    data?: any;
  }) {
    res.status(httpCode).json({
      message,
      code,
      data,
    });
  }
}

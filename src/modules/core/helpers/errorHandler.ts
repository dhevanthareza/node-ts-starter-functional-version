class ApplicationError extends Error {
  public code: any;
  public message: string;
  public data: any = {};
  public httpCode: number = 400
  constructor({
    message = 'Internal Server Error',
    code = 'SERVER_ERROR',
    httpCode = 400,
    data = {},
  }: {
    message: string,
    code?: any,
    data?: any,
    httpCode?: number,
  }) {
    super();

    Error.captureStackTrace(this, this.constructor);

    this.message = message || 'Internal Server Error';

    this.code = code || 'SERVER_ERROR';

    this.httpCode = httpCode || 500;

    this.data = data || {};
  }
}
export default ApplicationError;

import { NextFunction, Request, Response } from 'express'

const pathMiddleware = (req: Request, res: Response, next: NextFunction) => {
  res.locals.path = req.path
  next()
}

export { pathMiddleware }


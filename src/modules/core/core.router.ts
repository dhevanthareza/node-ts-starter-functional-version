import { Router } from 'express';
import AuthController from './controllers/auth.controller';

const CoreRouter = Router();
CoreRouter.use('/auth', AuthController)

export default CoreRouter
import express from 'express';
import 'reflect-metadata';
import AuthController from './modules/core/controllers/auth.controller';
import ManagementRouter from './modules/management/management.router';
const RouteLoader = (app: express.Application) => {
  app.use('/auth', AuthController);
  app.use('/management', ManagementRouter);
};

export = RouteLoader;

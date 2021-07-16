import express from 'express';
import 'reflect-metadata';
import AuthController from './modules/core/controllers/auth.controller';
import isAuthenticated from './modules/core/middlewares/auth.middleware';
import ManagementRouter from './modules/management/management.router';
import UmkmCategoryController from './modules/umkmCategory/umkmCategory.controller';
const RouteLoader = (app: express.Application) => {
  app.use('/auth', AuthController);
  app.use('/management', ManagementRouter);
  app.use('/umkm-category', isAuthenticated, UmkmCategoryController)
};

export = RouteLoader;

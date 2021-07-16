import 'reflect-metadata';
import { Sequelize } from 'sequelize-typescript';

const modelLoader = (sequelize: Sequelize) => {
  const models = [__dirname + '/**/*.model.*']
  sequelize.addModels(models)
}

export = modelLoader

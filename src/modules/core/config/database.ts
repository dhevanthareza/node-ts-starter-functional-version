import dotenv from 'dotenv'
import { Sequelize } from 'sequelize-typescript'
import { Dialect } from 'sequelize/types'
import * as config from './../../../config.json'
dotenv.config()


const sequelize = new Sequelize((config as any)[process.env.NODE_ENV].database, (config as any)[process.env.NODE_ENV].username, (config as any)[process.env.NODE_ENV].password, {
  timezone: '+07:00',
  dialect: (config as any)[process.env.NODE_ENV].dialect as Dialect,
  logging: false,
  host: (config as any)[process.env.NODE_ENV].host,
  port: (config as any)[process.env.NODE_ENV].port,
})

export { sequelize }


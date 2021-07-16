import bodyParser from 'body-parser'
import compression from 'compression'
import cors from 'cors'
import express from 'express'
import expressStatusMonitor from 'express-status-monitor'
import path from 'path'
// import morgan from 'morgan'
import 'reflect-metadata'

const middlewareLoader = (app: express.Application) => {
  app.use(expressStatusMonitor())
  app.use(compression())
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(cors())
  app.use('/file', express.static(path.join(__dirname, '../file')));
  // app.use(morgan('tiny', {
  //   stream: {
  //     write: (message) => {
  //       logger.info(message)
  //     },
  //   },
  // }))
}

export = middlewareLoader

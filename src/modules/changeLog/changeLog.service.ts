import { updatedDiff } from 'deep-object-diff'
import { logger } from '../core/helpers/logger'
import ChangeLog from './changeLog.model'

export enum ChangeLogModule {
  master,
}

interface IChangeLogObject {
  module: ChangeLogModule,
  relatedId: string,
  type: string,
  description: string,
  previousData?: object,
  nextData?: object,
  userId: number,
}

export class ChangeLogService {

  public static getInstance(): ChangeLogService {
    if (!ChangeLogService.instance) {
      ChangeLogService.instance = new ChangeLogService()
    }

    return ChangeLogService.instance
  }

  private static instance: ChangeLogService

  private constructor() { }

  public async create(object: IChangeLogObject) {
    try {
      console.log(updatedDiff(object.previousData, object.nextData))
      await ChangeLog.create({
        userId: object.userId,
        module: ChangeLogModule[object.module],
        relatedId: object.relatedId,
        type: object.type,
        description: object.description,
        previousData: JSON.stringify(object.previousData ?? {}),
        nextData: object.previousData && object.nextData
          ? JSON.stringify(updatedDiff(object.previousData, object.nextData))
          : JSON.stringify(object.nextData),
      })
    } catch (error) {
      logger.error(error.message, 'ChangeLogService create')
    }
  }

}

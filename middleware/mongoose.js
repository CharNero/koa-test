import mongoose from '@south-paw/koa-mongoose'
import * as schemas from '../schemas'
import { db } from '../config'

const defOpts = {
  user: '',
  pass: '',
  host: '127.0.0.1',
  port: 27017,
  db: 'test',
  schemas,
  mongoOptions: {
    reconnectTries: 0,
    reconnectInterval: 0
  }
}

const options = Object.assign({}, defOpts, db)

export default mongoose(options)

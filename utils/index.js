import jwt from 'jsonwebtoken'
import config from '../config'

export * from './validate'

export const getToken = user => 'Bearer ' + jwt.sign(user, config.jwt.secret)

export const clear = () =>
  process.stdout.write(
    process.platform === 'win32' ? '\x1Bc' : '\x1B[2J\x1B[3J\x1B[H'
  )

import jwt from 'koa-jwt'
import config from '../config'

export default jwt({
  secret: config.jwt.secret,
  passthrough: true
}).unless({
  path: [/^\/download/]
})
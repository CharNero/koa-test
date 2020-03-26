import jwt from 'koa-jwt'
import config from '../config'

export default jwt({
  debug: true,
  secret: config.jwt.secret,
  passthrough: true,
  maxAge: '1h'
}).unless({
  path: [
    /^(((?!\/api).*)|(\/api\/v[1-9]\/(swagger(-json)?|user\/(login|register|send))))$/
  ]
})

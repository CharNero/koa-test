import compose from 'koa-compose'
import utils from './utils'
import cors from './cors'
import koaJwt from './jwt'
import sendMail from './mail'
import errorCatch from './errorCatch'
import koaBody from './body'
import koaMongoose from './mongoose'
import koaStatic from './static'

export default compose([
  utils,
  cors,
  koaJwt,
  sendMail,
  errorCatch,
  koaBody,
  koaMongoose,
  koaStatic
])

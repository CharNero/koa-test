import Koa from 'koa'
import consola from 'consola'
import config from './config'
import middleware from './middleware'
import router from './routes'

const app = new Koa()

app
  .use(middleware)
  .use(router.routes())
  .use(router.allowedMethods())

let port = config.server.port || 80
app.listen(port, () => {
  consola.success(`Server is running at ${port}`)
})

export default app
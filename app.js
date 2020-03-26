import chalk from 'chalk'
import Koa from 'koa'
import consola from 'consola'
import config from './config'
import middleware from './middleware'
import router from './routes'
import { clear } from './utils'

const app = new Koa()

app
  .use(middleware)
  .use(router.routes())
  .use(router.allowedMethods())

const port = config.server.port || 80
app.listen(port, () => {
  clear()

  consola.success('Server is running at:')
  console.log(`  ${chalk.green(`http://localhost:${port}`)}`)

  console.log('Api Docs is running at:')
  console.log(`  V1: ${chalk.green(`http://localhost:${port}/api/v1/swagger`)}`)
  console.log(`  V2: ${chalk.green(`http://localhost:${port}/api/v2/swagger`)}`)
})

export default app

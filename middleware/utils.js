import chalk from 'chalk'
import consola from 'consola'

export default async (ctx, next) => {
  // 挂载成功方法
  ctx.success = function(data = null, msg = '操作成功') {
    this.body = {
      code: 200,
      data,
      msg
    }
  }

  // 挂载失败方法
  ctx.fail = function(msg = '操作失败', code = 500, data = null) {
    this.body = {
      code,
      data,
      msg
    }
  }

  // 打印请求日志
  const msg = [
    `[ ${chalk.yellow(new Date().toLocaleString())} ]`,
    `${chalk.bgGreen.black(` ${ctx.method.toUpperCase()} `)} ${chalk.cyan(
      ctx.url
    )}`
  ]
  // Request
  if (ctx.request.body || ctx.querystring) {
    msg.push(`${chalk.green.bold('+ Request:')}`)
  }

  if (ctx.querystring) {
    msg.push(` + ${chalk.blueBright('querystring:')}`)
    msg.push(`  - ${JSON.stringify(ctx.querystring)}`)
  }

  if (ctx.request.body && Object.keys(ctx.request.body).length) {
    msg.push(` + ${chalk.blueBright('body:')}`)
    msg.push(`  - ${JSON.stringify(ctx.request.body)}`)
  }

  consola.info(msg.join('\n'), '\n')

  await next()
}

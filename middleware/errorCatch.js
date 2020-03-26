export default async (ctx, next) => {
  try {
    ctx.assert(!ctx.state.jwtOriginalError, 401, 'Token 失效，请重新登陆！')
  } catch (err) {
    ctx.fail(err.message)
  }
  await next()
}

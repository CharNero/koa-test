import body from 'koa-body'

export default body({
  multipart: true,
  parsedMethods: ['POST', 'PUT', 'PATCH', 'DELETE']
})
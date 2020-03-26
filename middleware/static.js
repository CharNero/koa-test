import path from 'path'
import server from 'koa-static'

export default server(path.join(__dirname, '../static'), {
  setHeaders(res, file, stats) {
    if (RegExp(`download/${path.basename(file)}$`).test(file)) {
      res.setHeader('Content-Type', 'application/octet-stream')
      res.setHeader('Content-Disposition', 'attachment')
      res.setHeader('Content-Length', stats.size)
    }
  }
})

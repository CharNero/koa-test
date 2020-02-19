import compose from 'koa-compose'
import fs from 'fs'

let middleware
let files = fs.readdirSync(__dirname)
files = files.filter(file => file != 'index.js')

middleware = compose(files.map(item => require('./' + item).default))
export default middleware
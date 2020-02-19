const fs = require('fs')
const path = require('path')

let schemas = {}
let files = fs.readdirSync(__dirname)
files = files.filter(file => file != 'index.js')

files.forEach(schema => {
  schemas[path.basename(schema, '.js')] = ({ Schema }) => new Schema(require('./' + schema))
})

module.exports = schemas
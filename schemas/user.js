module.exports = {
  name: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    match: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
  },
  pass: {
    type: String,
    trim: true
  },
  phone: {
    type: String,
    trim: true,
    match: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/
  },
  updateDate: {
    type: Date,
    min: Date('1970-01-01'),
    max: Date()
  },
  createDate: {
    type: Date,
    min: Date('1970-01-01'),
    max: Date()
  }
}
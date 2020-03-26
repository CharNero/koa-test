export default ({ Schema }) =>
  new Schema(
    {
      name: {
        type: String,
        trim: true,
        required: [true, '用户名不能为空']
      },
      mail: {
        type: String,
        trim: true,
        match: [
          /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
          '邮箱格式不正确'
        ]
      },
      pass: {
        type: String,
        trim: true,
        required: [true, '密码不能为空']
      },
      phone: {
        type: String,
        trim: true,
        required: [true, '手机号不能为空'],
        unique: true,
        match: [/^(?:(?:\+|00)86)?1[3-9]\d{9}$/, '手机号格式不正确']
      }
    },
    {
      collection: 'users',
      timestamps: true
    }
  )

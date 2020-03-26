import {
  request,
  summary,
  body,
  tags,
  prefix,
  path,
  description
} from 'koa-swagger-decorator'
import { getToken } from '../../utils'

const tag = tags(['用户管理'])

const userSchema = {
  name: { type: 'string', required: true, description: '用户名' },
  pass: { type: 'string', required: true, description: '密码' },
  phone: { type: 'string', required: true, description: '手机号' },
  mail: { type: 'string', required: true, description: '邮箱' }
}

@prefix('/user')
export default class UserRouter {
  @request('post', '/send')
  @summary('发送验证码')
  @tag
  @body({ mail: { type: 'string', required: true } })
  static async sendMail(ctx) {
    const { mail } = ctx.validatedBody
    // if (!isEmail(mail)) {
    //   ctx.fail('邮箱格式不正确')
    // }
    try {
      const messageId = await ctx.sendCode({ mail })

      ctx.success({
        messageId
      })
    } catch (err) {
      ctx.fail(err.message)
    }
  }

  @request('POST', '/register')
  @summary('用户注册')
  @description('example of api')
  @tag
  @body({
    messageId: { type: 'string', required: true },
    code: { type: 'string', required: true },
    ...userSchema
  })
  static async register(ctx) {
    const { name, pass, phone, mail, messageId, code } = ctx.validatedBody

    const isMatched = ctx.verifyCode({
      code,
      messageId,
      mail
    })
    if (!isMatched) {
      ctx.fail('验证失败，请重新验证！')
    }

    try {
      const UserModel = ctx.model('user')
      const user = new UserModel({
        name,
        pass,
        phone,
        mail
      })
      await user.save()
      ctx.success({
        user: user.toJSON(),
        token: getToken(user.toJSON())
      })
    } catch (err) {
      ctx.fail(err.message)
    }
  }

  @request('post', '/login')
  @summary('用户登录')
  @tag
  @body(userSchema)
  static async login(ctx) {
    const { phone, pass } = ctx.validatedBody
    const UserModel = ctx.model('user')

    try {
      const user = await UserModel.findOne({ phone, pass })
      ctx.assert(user, 500, '登录失败，请检查账号密码是否正确！')
      ctx.success({
        user: user.toJSON(),
        token: getToken(user.toJSON())
      })
    } catch (err) {
      ctx.fail(err.message)
    }
  }

  @request('get', '')
  @summary('用户列表')
  @tag
  static async getAll(ctx) {
    const UserModel = ctx.model('user')
    const users = await UserModel.find({})

    if (users) {
      ctx.success(users)
    } else {
      ctx.fail()
    }
  }

  @request('get', '/{id}')
  @summary('用户信息')
  @tag
  @path({ id: { type: 'string', required: true } })
  static async getOne(ctx) {
    const { id } = ctx.validatedParams
    const UserModel = ctx.model('user')
    const user = await UserModel.findById(id)

    if (!user) {
      ctx.fail('用户不存在！')
    } else {
      ctx.success(user.toJSON())
    }
  }

  @request('DELETE', '/{id}')
  @summary('用户删除')
  @tag
  @path({ id: { type: 'string', required: true } })
  static async deleteOne(ctx) {
    const { id } = ctx.validatedParams
    const UserModel = ctx.model('user')

    try {
      await UserModel.deleteOne({ _id: id })
      ctx.success()
    } catch (err) {
      ctx.fail(err.message)
    }
  }
}

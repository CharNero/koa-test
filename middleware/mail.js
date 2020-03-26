import mailer from 'nodemailer'
import mailStore from '../config/mailStore'
import config from '../config'

// eslint-disable-next-line new-cap
const poster = new mailer.createTransport({
  host: config.mail.host,
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: config.mail.user, // generated ethereal user
    pass: config.mail.pass // generated ethereal password
  },
  pool: false,
  tls: {
    rejectUnauthorized: false
  }
})

function send() {
  const defaultOpts = {
    from: '16621631798@163.com', // 谁发的
    to: '1184842374@qq.com', // 发给谁
    subject: 'Verify Code', // 主题是什么
    html: `
      <div style="border: 1px solid #ddd; border-radius: 5px; padding: 15px;font-size: 16px;background: #eee; box-shadow: 0 0 5px 0 #ddd;">
        Your code is [ <strong>{{code}}</strong> ], vaild in 10 minutes
      </div>
    ` // html模板
  }

  return async (ctx, next) => {
    ctx.sendCode = async ({ mail, ...args }) => {
      const code = Math.floor(Math.random() * 1000000)
      const opts = Object.assign({}, defaultOpts, {
        to: mail,
        ...args,
        html: defaultOpts.html.replace('{{code}}', code)
      })

      const info = await poster.sendMail(opts)
      ctx.assert(info, 500, '验证码发送失败')
      mailStore.create({
        mail,
        code: code,
        messageId: info.messageId
      })

      return info.messageId
    }

    ctx.verifyCode = mailStore.verify.bind(mailStore)

    await next()
  }
}

export default send()

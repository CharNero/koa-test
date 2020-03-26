import { isEmail } from '../utils'

class Store {
  constructor() {
    this.store = {}
  }

  create({
    mail,
    messageId,
    code,
    sendTime = new Date().getTime(),
    maxAge = 10 * 60 * 1000
  }) {
    if (!isEmail(mail) || !messageId) {
      return false
    }
    this.store[messageId] = {
      mail,
      code,
      sendTime,
      maxAge
    }
    console.log(this.store)
    return true
  }

  verify({ mail, messageId, code }) {
    console.log(this.store)
    const currentMsg = this.store[messageId]
    // 验证码失效
    if (
      currentMsg &&
      currentMsg.sendTime + currentMsg.maxAge < new Date().getTime
    ) {
      delete this.store[messageId]
      return false
    }
    // 验证成功
    if (currentMsg && currentMsg.mail === mail && currentMsg.code === code) {
      delete this.store[messageId]
      return true
    }
    // 清理无效验证码
    if (Object.keys(this.store).length > 30) {
      for (const key in this.store) {
        if (
          this.store.hasOwnProperty(key) &&
          this.store[key].sendTime + this.store[key].maxAge < new Date().getTime
        ) {
          delete this.store[key]
        }
      }
    }

    return false
  }
}

export default new Store()

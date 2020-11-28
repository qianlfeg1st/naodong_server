import { Controller } from 'egg'


class Common extends Controller {

  // 登录
  async login () {

    const { ctx } = this
    const { body, ip } = ctx.request

    const sign = await this.service.wechat.login({
      header: ctx.request.header,
      body,
      ip,
    })

    ctx.body = {
      data: {
        sign,
      },
      status: true,
    }
  }

  // 静默登录
  async silentLogin () {

    const { ctx } = this
    const { body, ip } = ctx.request

    const { sign, isNewUser } = await this.service.wechat.silentLogin({
      header: ctx.request.header,
      body,
      ip,
    })

    ctx.body = {
      data: {
        sign,
        isNewUser,
      },
      status: true,
    }
  }

}

export default Common

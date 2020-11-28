import { Controller } from 'egg'

class Common extends Controller {

  // 静默登陆
  async silentLogin () {

    const { ctx } = this
    const { body, ip } = ctx.request
    const { agent } = ctx.request.header

    const res = await this.service.alipay.silentLogin({
      schema: 'AlipayUser',
      code: body.code,
      appId: '2021001175667100',
      ip,
      agent,
    })

    ctx.body = {
      data: {
        sign: res,
      },
      status: true,
    }
  }

  // 更新用户信息
  async updateUserInfo () {

    const { ctx } = this
    const { body } = ctx.request
    const { sign } = ctx.request.header

    const res = await ctx.service.alipay.updateUserInfo({
      schema: 'AlipayUser',
      body,
      sign,
    })

    ctx.body = {
      status: res,
    }
  }

}

export default Common

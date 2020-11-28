import { Controller } from 'egg'
import rules from './rules/index'

/**
 * @controller 公共
 */
class Common extends Controller {

  /**
   * @summary 管理后台登陆
   * @description 登陆
   * @router post /admin/login
   * @request body loginRequest *body
   * @response 200 loginResponse
   */
  async login () {

    let { ctx } = this
    const { body, ip } = ctx.request

    // 参数校验
    const context = await this.service.utils.validate(ctx, rules.login, body)

    if (context) {

      ctx = context

      return
    }

    const { account, password } = body
    const res = await ctx.model.Account.find({
      account,
      password: await this.service.utils.md5(password),
    })

    if (res.length) {

      this.ctx.session.user = res[0]

      const token = await this.service.utils.encodeToken({
        _id: res[0]._id,
        ip,
        'user-agent': ctx.request.header['user-agent'],
      })

      await this.updateIp({
        _id: res[0]._id,
        last_ip: ip,
      })

      ctx.body = {
        token,
        account: res[0].account,
      }
    } else {

      ctx.status = 401
    }
  }

  // 登出
  async logout () {

    this.ctx.session = null
  }

  // 更新IP
  async updateIp ({ _id, last_ip }) {

    await this.ctx.model.Account.updateOne({ _id }, {
      last_ip,
    })
  }

}

export default Common

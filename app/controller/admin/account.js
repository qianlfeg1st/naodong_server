import { Controller } from 'egg'
/**
 * @controller 账号
 */
class Account extends Controller {

  /**
   * @summary 新增
   * @description 新增登陆账号
   * @router post /admin/account/add
   * @request body AccountAddRequest *body
   * @response 200 AccountAddResponse
   * @apikey
   */
  async add () {

    const { ctx } = this
    const { body, ip } = ctx.request

    const res = await ctx.model.Account.find({
      account: body.account,
    })

    if (res.length) {

      ctx.status = 422
      ctx.body = '该账号已存在!'

      return
    }

    const admin = new ctx.model.Account({
      ...body,
      password: await this.service.utils.md5(body.password),
      last_ip: ip,
    })

    await admin.save()

    ctx.body = ''
  }

  // 注册账号
  async register () {

    // const { ctx } = this
    // const { body, ip } = ctx.request
  }

  // 账号详情
  async detail () {

    const { ctx } = this

    const res = await ctx.model.Account.find({ _id: ctx.params.id })

    ctx.body = res[0]
  }

  // 账号列表
  async load () {

    const { ctx } = this
    const { size, page, account, startTime, endTime, mobile, email, isSuper } = ctx.request.body

    // 查询条件
    const match = {
      account: {
        $regex: new RegExp(account),
      },
      mobile: {
        $regex: new RegExp(mobile),
      },
      email: {
        $regex: new RegExp(email),
      },
    }

    if ([0, 1].includes(isSuper)) {

      match.is_super = isSuper
    }

    if (startTime && endTime) {

      match.add_time = {
        $gte: startTime,
        $lte: endTime,
      }
    }

    const res = await ctx.model.Account.aggregate([
      {
        $match: match,
      },
      {
        $skip: page * size,
      },
      {
        $limit: size,
      },
    ])

    const total = await ctx.model.Account.find(match)

    ctx.body = {
      data: res,
      total: total.length,
    }
  }

}

export default Account

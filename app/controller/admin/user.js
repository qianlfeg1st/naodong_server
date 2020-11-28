import { Controller } from 'egg'

class User extends Controller {

  // 用户列表
  async load () {

    const { ctx } = this
    const { size, page } = ctx.request.body

    const total = await ctx.model.User.count()

    const res = await ctx.model.User.aggregate([
      {
        $skip: page * size,
      },
      {
        $limit: size,
      },
    ])

    ctx.body = {
      data: res,
      total,
    }
  }

  // 支付宝用户
  async alipayUser () {

    const { ctx } = this
    const { size, page } = ctx.request.body

    const total = await ctx.model.AlipayUser.count()

    const res = await ctx.model.AlipayUser.aggregate([
      {
        $skip: page * size,
      },
      {
        $limit: size,
      },
    ])

    ctx.body = {
      data: res,
      total,
    }
  }

}

export default User

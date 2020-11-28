import { Controller } from 'egg'

class User extends Controller {

  // 用户信息
  async load () {

    const { ctx } = this

    try {

      const userInfo = await this.service.utils.decodeToken(ctx.request.header.sign) || {}

      const res = await ctx.model.WechatUser.find({
        _id: userInfo.userId,
      })

      if (res.length > 0) {

        const { avatarUrl, nickName, gender } = res[0]

        ctx.body = {
          avatarUrl,
          nickName,
          gender,
        }
      }
    } catch (error) {

      console.error('~~error~~', error)

      ctx.status = 400
      ctx.body = {
        message: '用户不存在',
      }
    }
  }

}

export default User

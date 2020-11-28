import { Service } from 'egg'
import AlipaySdk from 'alipay-sdk'

const application = {
  2021001175667100: '',
}

class AliapyService extends Service {

  async silentLogin ({ schema, code, ip, agent, appId }) {

    try {

      const alipaySdk = new AlipaySdk({
        appId,
        privateKey: application[appId],
      })

      const res = await alipaySdk.exec('alipay.system.oauth.token', {
        grantType: 'authorization_code',
        code,
      })

      const userId = await this.addOrUpdateUser({
        userInfo: res,
        schema,
      })

      // 加签
      const sign = await this.service.utils.encodeToken({
        userId,
        ip,
        agent,
      }, 315360000)

      return sign
    } catch (error) {

      this.ctx.logger.warn('~~静默登陆失败~~', error)
    }
  }

  // 新增或更新用户
  async addOrUpdateUser ({ userInfo, schema }) {

    const { isNewUser, id } = await this.isNewUser({
      userId: userInfo.userId,
      schema,
    })
    const _id = isNewUser ? await this.addUser(userInfo, schema) : await this.updateAccessToken(userInfo.accessToken, id, schema)

    // console.log('~isNewUser~', isNewUser)

    return _id
  }

  // 是否为新用户
  async isNewUser ({ userId, schema }) {

    const res = await this.ctx.model[schema].find({
      userId,
    })

    // 老用户
    if (res.length > 0) {

      return {
        isNewUser: false,
        id: res[0]._id,
      }
    } else {

      return {
        isNewUser: true,
      }
    }
  }

  // 更新用户访问令牌
  async updateAccessToken (accessToken, _id, schema) {

    const res = await this.ctx.model[schema].updateOne({
      _id,
    }, {
      accessToken,
    })

    // 更新失败
    if (!res) this.ctx.logger.warn('用户信息更新失败', _id)

    return _id
  }

  // 新增用户
  async addUser ({ accessToken, alipayUserId, userId }, schema) {

    const user = new this.ctx.model[schema]({
      accessToken,
      alipayUserId,
      userId,
      add_time: new Date().getTime(),
    })

    const res = await user.save()

    return res._id
  }

  async updateUserInfo ({ schema, body, sign }) {

    try {

      const { avatar, countryCode } = body
      const userInfo = sign ? await this.service.utils.decodeToken(sign) : {}

      const res = await this.ctx.model[schema].updateOne({
        _id: userInfo.userId,
      }, {
        ...body,
        avatarUrl: avatar,
        country: countryCode,
      })

      // 更新失败
      if (!res) this.ctx.logger.warn('用户信息更新失败', new Error(userInfo))

      return Boolean(res)
    } catch (error) {

      this.ctx.logger.warn('~~用户信息更新失败~~', error)

      return false
    }
  }

}

export default AliapyService

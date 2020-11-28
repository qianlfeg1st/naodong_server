import { Service } from 'egg'
import WXBizDataCrypt from './modules/WXBizDataCrypt'

class WechatService extends Service {

  // 登录
  async login ({ header, body, ip }) {

    const { sign, agent } = header

    const userInfo = sign ? await this.service.utils.decodeToken(sign) : {}

    const { res, sessionKey } = await this.decryptData({
      ...body,
      session_key: userInfo.sessionKey,
    })

    const userId = await this.addOrUpdateUser({
      userInfo: {
        ...res,
        appid: res.watermark.appid,
      },
      _id: userInfo.userId,
    })

    // session_key的维护放在前端，如果前端删除了sign，这样有可能会导致"this.decryptData()"解密失败
    const token = await this.service.utils.encodeToken({
      userId,
      ip,
      agent,
      sessionKey,
    }, 315360000)

    return token
  }

  async silentLogin ({ header, body, ip }) {

    const { sign, agent } = header

    const { session_key, openid } = await this.code2session(body.code)

    const userInfo = sign ? await this.service.utils.decodeToken(sign) : {}

    const { userId, isNewUser } = await this.addOrUpdateUser({
      userInfo: {
        appid: body.appid,
        openId: openid,
      },
      _id: userInfo.userId,
    })

    const token = await this.service.utils.encodeToken({
      userId,
      ip,
      agent,
      sessionKey: session_key,
    }, 315360000)

    return {
      sign: token,
      isNewUser,
    }
  }

  // 新增或更新用户
  async addOrUpdateUser ({ _id, userInfo }) {

    const isNewUser = await this.isNewUser(userInfo.openId)
    const userId = isNewUser ? await this.addUser(userInfo) : await this.updateUser({ _id, userInfo })

    return {
      isNewUser,
      userId,
    }
  }

  async isNewUser (openId) {

    const res = await this.ctx.model.WechatUser.find({
      openId,
    })

    return !(res.length > 0)
  }

  // 新增用户
  async addUser (userInfo) {

    const user = new this.ctx.model.WechatUser({
      ...userInfo,
      add_time: new Date().getTime(),
    })

    const res = await user.save()

    return res._id
  }

  // 更新用户信息
  async updateUser ({ userInfo }) {

    // console.log('更新用户信息', userInfo)

    await this.ctx.model.WechatUser.updateOne({
      openId: userInfo.openId,
    }, userInfo)

    const res = await this.ctx.model.WechatUser.find({
      openId: userInfo.openId,
    })

    // console.log('~~@@updateUser@@~~', res[0])

    return res[0]._id
  }

  // 用auth_code换取session_key
  async code2session (js_code) {

    const { ctx } = this
    const { appid, secret } = this.config.wechat

    const { data } = await ctx.curl('https://api.weixin.qq.com/sns/jscode2session', {
      dataType: 'json',
      data: {
        appid,
        secret,
        js_code,
        grant_type: 'authorization_code',
      },
    })

    return data
  }

  // 解密
  async decryptData ({ code, encryptedData, iv, session_key }) {

    let sessionKey

    // session_key已失效
    if (code) {

      sessionKey = (await this.code2session(code)).session_key
    } else {

      if (session_key) {

        sessionKey = session_key
      } else {

        sessionKey = (await this.code2session(code)).session_key
      }
    }

    const appid = this.config.wechat.appid
    const WX = new WXBizDataCrypt(appid, sessionKey)

    const res = WX.decryptData({
      encryptedData,
      iv,
    })

    return {
      res,
      sessionKey,
    }
  }

}

export default WechatService

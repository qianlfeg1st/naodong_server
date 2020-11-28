// 校验用户是否登录
export default () => async (ctx, next) => {

  return await next()

  // 允许不登录访问的API
  const whiteList = [
    '/wechat/login',
    '/wechat/silentLogin',
  ]

  if (whiteList.includes(ctx.request.url)) {

    await next()
  } else {

    const { sign, agent } = ctx.request.header
    const userInfo = await ctx.service.utils.decodeToken(sign)

    // ip/user-agent 有变化必须重新登录
    if (userInfo && userInfo.ip === ctx.request.ip && userInfo.agent === agent) {

      await next()
    } else {

      ctx.status = 203
    }
  }
}

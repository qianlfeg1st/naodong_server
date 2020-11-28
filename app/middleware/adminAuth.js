// 校验用户是否登录
export default () => async (ctx, next) => {

  // 允许不登录访问的API
  const whiteList = [
    '/admin/login',
  ]

  if (whiteList.includes(ctx.request.url)) {

    await next()
  } else {

    const token = await ctx.service.utils.decodeToken(ctx.request.header.token)
    const env = process.env.NODE_ENV

    if (env === 'development' && ctx.session.user && token && token['user-agent'] === ctx.request.header['user-agent']) {

      await next()
    } else if (env === 'production' && ctx.session.user && token && token['user-agent'] === ctx.request.header['user-agent'] && token.ip === ctx.request.ip) {

      await next()
    } else {

      ctx.status = 203
    }
  }
}

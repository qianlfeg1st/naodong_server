const fs = require('fs')
const path = require('path')

module.exports = appInfo => {

  const config = {}

  // cookie签名秘钥
  config.keys = appInfo.name + '_1594106789828_5557'

  // 中间件
  config.middleware = ['adminAuth', 'wechatAuth', 'alipayAuth']

  config.adminAuth = {
    match: '/admin',
  }

  config.wechatAuth = {
    match: '/wechat',
  }

  config.alipayAuth = {
    match: '/alipay',
  }

  // session
  config.session = {
    key: 'SESSION_ID',
    maxAge: 8640000,
    httpOnly: true,
    encrypt: true,
    // 延长会话有效期
    renew: true,
  }

  // csrf防御
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: false,
    },
  }

  config.multipart = {
    mode: 'file',
    fileSize: '15mb',
  }

  // 统一处理错误
  config.onerror = {
    all (error, ctx) {

      const status = ctx.response.status

      ctx.body = JSON.stringify({
        message: `${error}`,
        path: ctx.request.url,
        timestamp: `${+new Date()}`,
        status,
      })

      ctx.status = status
    },
  }

  // 站点文件
  config.siteFile = {
    '/favicon.ico': fs.readFileSync(path.join(__dirname, 'favicon.ico')),
  }

  // curl配置
  config.httpclient = {
    request: {
      timeout: 20000,
    },
  }

  // 用户配置
  const userConfig = require('./userConfig')

  return {
    ...config,
    ...userConfig,
  }
}

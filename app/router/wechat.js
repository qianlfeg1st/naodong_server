import path from 'path'

export default app => {

  const root = path.basename(__filename, '.js')
  const { router, controller } = app
  const {
    common,
    license,
  } = controller[root]

  // 登录
  router.post(`/${root}/login`, common.login)

  // 静默登录
  router.post(`/${root}/silentLogin`, common.silentLogin)

  // 驾照查分
  router.post(`/${root}/license/query`, license.query)

  // 驾驶证识别
  router.post(`/${root}/license/orc`, license.orc)

  // 驾驶证识别
  router.post(`/${root}/license/upload`, license.upload)

  // 用户信息
  // router.get(`/${root}/user`, user.load)
}

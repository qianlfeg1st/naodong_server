import path from 'path'

export default app => {

  const root = path.basename(__filename, '.js')
  const { router, controller } = app
  const {
    common,
    license,
  } = controller[root]

  // 登陆
  router.post(`/${root}/login`, common.silentLogin)

  // 更新用户信息
  router.post(`/${root}/updateUserInfo`, common.updateUserInfo)

  // 驾照查分
  router.post(`/${root}/license/query`, license.query)

  // 驾驶证识别
  router.post(`/${root}/license/orc`, license.orc)

  // 驾驶证识别
  router.post(`/${root}/license/upload`, license.upload)
}

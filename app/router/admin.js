import path from 'path'

export default app => {

  const root = path.basename(__filename, '.js')
  const { router, controller } = app

  const {
    common,
    account,
    user,
  } = controller[root]

  // 登陆
  router.post(`/${root}/login`, common.login)
  // 登出
  router.post(`/${root}/logout`, common.logout)

  // 账号列表
  router.post(`/${root}/account/load`, account.load)
  // 账号详情
  router.get(`/${root}/account/:id`, account.detail)
  // 新增账号
  router.post(`/${root}/account/add`, account.add)

  // 用户相关
  router.post(`/${root}/user/alipay`, user.alipayUser)

}

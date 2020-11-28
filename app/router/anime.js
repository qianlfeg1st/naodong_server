import path from 'path'

export default app => {

  const root = path.basename(__filename, '.js')
  const { router, controller } = app

  const {
    works,
  } = controller[root]

  // 新增作品
  router.get(`/${root}/works/add`, works.add)

}

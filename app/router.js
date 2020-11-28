import admin from './router/admin'
import wechat from './router/wechat'
import alipay from './router/alipay'
import anime from './router/anime'

export default app => {

  admin(app)
  wechat(app)
  alipay(app)
  anime(app)

  const { router, controller } = app

  router.get('/', controller.home.index)

  // router.get('/catchCityData', controller.home.catchCityData)

  // router.get('/catchOilStationData', controller.home.catchOilStationData)

  router.get('/data/:cityName', controller.home.getData)
}

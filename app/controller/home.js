import { Controller } from 'egg'

class HomeController extends Controller {

  async index () {

    const { ctx } = this

    ctx.body = '❤'
  }

  // 爬取城市数据
  async catchCityData () {

    const { ctx } = this

    this.service.amap.catchCityData()

    ctx.body = 'catchCityData'
  }

  async getData () {

    const { ctx } = this
    const cityName = ctx.params.cityName

    const res = await ctx.model.Station.find({
      cityName: {
        $regex: new RegExp(cityName),
      },
    })

    ctx.set('Content-Type', 'text/csv;charset=gb2312;')
    ctx.set('Content-Disposition', 'attachment;filename=' + encodeURIComponent(`${cityName}地区全部加油站列表【共${res.length + 1}家】.csv`))
    ctx.set('Pragma', 'no-cache')

    const content = await this.service.utils.csv('加油站名称,城市名称,详细地址,联系电话,地区,经度,纬度', JSON.parse(JSON.stringify(res)).map(item => {

      return {
        name: item.name || '',
        cityName: item.cityName || '',
        address: item.address || '',
        tel: item.tel || '',
        adname: item.adname || '',
        longitude: item.longitude || '',
        latitude: item.latitude || '',
      }
    }))

    ctx.body = content
  }

  // 爬取加油站数据
  async catchOilStationData () {

    const { ctx } = this

    this.service.amap.catchOilStationData()

    ctx.body = 'catchOilStationData'
  }

}

export default HomeController

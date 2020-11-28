import { Service } from 'egg'

const { key } = require(`${process.cwd()}/config/userConfig`).amap

class AMAPService extends Service {

  // 抓取省市数据
  async catchCityData () {

    const { data, status } = await this.ctx.curl(`http://restapi.amap.com/v3/config/district?key=${key}&keywords=&subdistrict=2&extensions=base`, {
      dataType: 'json',
      method: 'GET',
    })

    if (status !== 200) return

    if (!data.districts.length) return

    data.districts[0].districts.forEach(async item => {

      const res = await this.ctx.model.City.find({
        adcode: item.adcode,
      })

      // 有重复数据
      if (res.length) return

      const info = new this.ctx.model.City({
        name: item.name,
        level: item.level,
        center: item.center,
        adcode: item.adcode.length ? item.adcode : '',
        citycode: item.citycode.length ? item.citycode : '',
        districts: JSON.stringify(item.districts),
      })

      await info.save()
    })
  }

  // 获取加油站总数
  async getOilStationCount ({ city, key }) {

    const { data } = await this.getOilStationData({ key, page: 1, city })()

    return data.count
  }

  // 获取加油站数据
  getOilStationData ({ key, city, page }) {

    return () => {

      return new Promise(async (resolve, reject) => {

        try {

          const { data, status } = await this.ctx.curl(`https://restapi.amap.com/v3/place/text?key=${key}&city=${city}&types=010100&page=${page}&keywords=&children=&offset=&page=&extensions=all`, {
            dataType: 'json',
            method: 'GET',
          })

          resolve({ data, status, index: page })
        } catch (error) {

          reject(error)
        }
      })
    }
  }

  // 抓取加油站数据
  async catchOilStationData (index = 0, cityData = null) {

    console.log('~~catchOilStationData~~START~~', index)

    const city = cityData || (await this.ctx.model.City.find()).map(item => JSON.parse(item.districts)).flat()

    // city.length = 3

    if (city.length === index) {

      console.log('~~OVER~~')

      return
    }

    const size = 20

    const count = await this.getOilStationCount({
      key,
      city: city[index].citycode,
    })

    const pages = Array(Math.ceil(count / size)).fill(0).map((_, idx) => this.getOilStationData({
      key,
      page: idx + 1,
      city: city[index].citycode,
    }))

    for await (const item of pages) {

      await this.service.utils.sleep(1000)

      const { data, index: idx } = await item()

      console.log(`~~~~~第${idx}页~~~~`, city[index].name, data.pois.length)

      if (!data.pois.length) {
        console.log('~~continue~~')

        continue
      }

      // 循环插入
      data.pois.forEach(async item => {

        const res = await this.ctx.model.Station.find({
          poi: item.id,
        })

        // 数据已存在
        if (res.length) {

          // console.log('~~数据已存在~~', item.id)
          return
        }

        const location = item.location.split(',')

        const info = await new this.ctx.model.Station({
          poi: item.id,
          adname: item.adname.length ? item.adname : '',
          adcode: item.adcode.length ? item.adcode : '',
          name: item.name.length ? item.name : '',
          address: item.address.length ? item.address : '',
          tel: item.tel.length ? item.tel : '',
          longitude: location[0],
          latitude: location[1],
          cityCode: city.length ? city[index].citycode : undefined,
          cityName: city.length ? city[index].name : undefined,
        })

        // console.log('@@@@~~index~~@@@@', index)

        // console.log('~~info~~', info.length)

        await info.save()
      })
    }

    console.log('~~catchOilStationData~~END~', index)

    await this.service.utils.sleep(1000)

    // 递归
    return this.catchOilStationData(index = index + 1, cityData = city)
  }

}

export default AMAPService

import { Controller } from 'egg'
import fs from 'fs'

class License extends Controller {

  async query () {

    const { ctx } = this
    const { licensenumber, licenseid } = ctx.request.body

    const res = await this.getScore({ licensenumber, licenseid })

    ctx.body = res

    ctx.logger.warn('~~~~@调用成功@~~~~', res)
  }

  // 查分
  async getScore ({ licensenumber, licenseid }) {

    const { ctx } = this

    const res = await ctx.service.redis.get(licensenumber)

    if (res) {

      return {
        status: true,
        data: {
          isTemp: true,
          licensenumber,
          ...res,
        },
      }
    } else {

      const res = await ctx.service.license.query({
        licensenumber,
        licenseid,
      })

      return res
    }
  }

  // 识别驾驶证
  async orc () {

    const { ctx } = this
    const file = ctx.request.files[0]
    const buffer = Buffer.from(fs.readFileSync(file.filepath))
    const base64 = `data:${file.mimeType};base64,${buffer.toString('base64')}`

    // console.log('~~file~~', file)

    const res = await ctx.service.orc.getLicenseInfo(base64)

    if (res) {

      const data = await this.getScore({
        licensenumber: res.cardCode,
        licenseid: res.archivesCode,
      })

      ctx.body = data

      this.ctx.logger.warn(`~~驾照查分${data.status ? '成功' : '错误'}~~`, data)

      await ctx.service.oss.upload({
        file: file.filepath,
        pathName: 'driverLicense',
      })
    } else {

      ctx.body = {
        message: '识别失败，请检查',
        status: false,
      }

      await ctx.service.oss.upload({
        file: file.filepath,
        pathName: 'driverLicenseError',
      })
    }
  }

  // 识别驾驶证
  async upload () {

    const { ctx } = this
    const file = ctx.request.files[0]
    const buffer = Buffer.from(fs.readFileSync(file.filepath))
    const base64 = `data:${file.mimeType};base64,${buffer.toString('base64')}`

    // console.log('~~upload-file~~', file)

    const res = await ctx.service.orc.getLicenseInfo(base64)

    if (res) {

      ctx.body = {
        status: true,
        data: {
          licensenumber: res.cardCode,
          licenseid: res.archivesCode,
        },
      }

      await ctx.service.oss.upload({
        file: file.filepath,
        pathName: 'driverLicense',
      })
    } else {

      ctx.body = {
        message: '识别失败，请检查',
        status: false,
      }

      await ctx.service.oss.upload({
        file: file.filepath,
        pathName: 'driverLicenseError',
      })
    }
  }

}

export default License

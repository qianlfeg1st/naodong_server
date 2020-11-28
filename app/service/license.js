import { Service } from 'egg'

const { appkey } = require(`${process.cwd()}/config/userConfig`).jisuapi

class LicenseService extends Service {

  // 驾照查分
  async query ({ licensenumber, licenseid }) {

    try {

      const { data, status } = await this.ctx.curl('https://api.jisuapi.com/driverlicense/query', {
        method: 'POST',
        dataType: 'json',
        data: {
          appkey,
          licensenumber,
          licenseid,
        },
      })

      if (status === 200) {

        if (data.status === 0) {

          // 缓存每天凌晨1点失效
          await this.ctx.service.redis.set(data.result.licensenumber, {
            score: data.result.score,
            licenseid: data.result.licenseid,
          })

          return {
            status: true,
            data: data.result,
          }
        } else {

          this.ctx.logger.warn('~~查询失败1，请重新尝试~~', data)

          return {
            status: false,
            message: data.msg || '查询失败，请重新尝试',
          }
        }
      } else {

        this.ctx.logger.warn('~~查询失败2，请重新尝试~~', data)

        return {
          status: false,
          message: '查询失败，请重新尝试',
        }
      }
    } catch (error) {

      this.ctx.logger.warn('~~查询失败3，请重新尝试~~', error, {
        licensenumber,
        licenseid,
      })

      return {
        status: false,
        message: '查询失败，请重新尝试',
      }
    }
  }

}

export default LicenseService

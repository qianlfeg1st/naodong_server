import { Service } from 'egg'

class CacheService extends Service {

  // 设置值
  async set (key, value, seconds) {

    if (!this.app.redis) return this.warning()

    const obj = JSON.stringify(value)

    if (seconds) {

      await this.app.redis.set(key, obj, 'EX', seconds)
    } else {

      await this.app.redis.set(key, obj)
    }
  }

  // 获取值
  async get (key) {

    if (!this.app.redis) {

      this.warning()

      return
    }

    const data = await this.app.redis.get(key)

    if (!data) return

    return JSON.parse(data)
  }

  // 警告
  warning () {

    console.log('\x1B[31m%s\x1B[0m', 'redis插件未启用，请检查配置')
  }

}

export default CacheService

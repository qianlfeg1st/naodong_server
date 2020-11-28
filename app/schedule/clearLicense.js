const Subscription = require('egg').Subscription

class UpdateCache extends Subscription {
/*
  // 通过 schedule 属性来设置定时任务的执行间隔等配置
  static get schedule () {
    return {
      // 立即执行
      immediate: true,
      // 1 分钟间隔
      interval: '1m',
      // 指定所有的 worker 都需要执行
      type: 'all',
      // 是否启动
      disable: true,
      // 仅在指定的环境下才启动该定时任务
      env: 'prod',
    }
  }
*/

  static get schedule () {
    return {
      // 每天零点执行
      cron: '0 0 1 * * *',
      type: 'all',
    }
  }

  // subscribe 是真正定时任务执行时被运行的函数
  async subscribe () {

    this.app.redis.flushall()

    this.ctx.logger.warn('~~开始执行定时任务~~', new Date().toLocaleString())
  }
}

module.exports = UpdateCache

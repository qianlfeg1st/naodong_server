// 配置babel
require('babel-register')({
  plugins: [
    // 支持 装饰器
    'transform-decorators-legacy',
    // 支持 import/export
    'transform-es2015-modules-commonjs',
    // 支持 符对象使用扩展运算
    'transform-object-rest-spread',
    // 支持 for await
    'syntax-async-generators',
  ],
})

class AppBootHook {

  constructor (app) {

    this.app = app
  }

  // 应用启动完毕
  async didReady () {

    // const ctx = await this.app.createAnonymousContext()

    // console.log('~~didReady~~', ctx.service.utils.md5(111))
  }

  // 此时 config 文件已经被读取并合并，但是还并未生效
  // 这是应用层修改配置的最后时机
  // 注意：此函数只支持同步调用
  configWillLoad () {

  }

  // 所有的配置已经加载完毕
  // 可以用来加载应用自定义的文件，启动自定义的服务
  didLoad () {

  }

  // 所有的插件都已启动完毕，但是应用整体还未 ready
  // 可以做一些数据初始化等操作，这些操作成功才会启动应用
  willReady () {

  }

  // http / https server 已启动，开始接受外部请求
  // 此时可以从 app.server 拿到 server 的实例
  serverDidReady () {

  }

}

module.exports = AppBootHook

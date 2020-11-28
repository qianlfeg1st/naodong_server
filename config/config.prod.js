module.exports = () => {

  const config = {}

  // mongodb数据库
  config.mongoose = {
    client: {
      url: 'mongodb://127.0.0.1/naodong',
      options: {
        auth: {
          authSource: 'admin',
        },
        user: 'qlf',
        pass: 'Qwe890320',
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    },
  }

  // redis数据库
  config.redis = {
    client: {
      host: '127.0.0.1',
      port: 6379,
      password: 'qlf890320',
      db: 0,
    },
  }

  // 跨域
  config.cors = {
    credentials: true,
    origin: ctx => {

      const whiteList = [
        'https://api.03os.com',
        'https://www.03os.com',
        'https://03os.com',
      ]

      return whiteList.find(item => item === ctx.get('origin'))
    },
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  }

  return config
}

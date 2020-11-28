module.exports = () => {

  const config = {}

  // mongodb数据库
  config.mongoose = {
    client: {
      url: 'mongodb://47.99.51.20/naodong',
      options: {
        auth: {
          authSource:
          'admin',
        },
        user: 'qlf',
        pass: '',
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
      password: '',
      db: 0,
    },
  }

  // 跨域
  config.cors = {
    credentials: true,
    // 允许所有跨域访问
    origin: ctx => ctx.get('origin'),
  }

  config.swaggerdoc = {
    apiInfo: {
      title: 'naodong-example-api',
      description: 'naodong example for swaggerdoc',
      version: '0.0.1',
    },
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    enable: true,
    routerMap: false,
    enableSecurity: true,
    securityDefinitions: {
      apikey: {
        type: 'apiKey',
        name: 'token',
        in: 'header',
      },
      // oauth2: {
      //   type: 'oauth2',
      //   tokenUrl: 'http://petstore.swagger.io/oauth/dialog',
      //   flow: 'password',
      //   scopes: {
      //     'write:access_token': 'write access_token',
      //     'read:access_token': 'read access_token',
      //   },
      // },
    },
  }

  return config
}

module.exports = {

  AccountAddRequest: {
    account: {
      required: true,
      type: 'string',
      example: 'qianlfeg',
      description: '账户',
    },
    password: {
      required: true,
      type: 'string',
      example: '123',
      description: '密码',
    },
    mobile: {
      required: true,
      type: 'string',
      example: '15858155190',
      description: '手机号',
    },
    email: {
      required: true,
      type: 'string',
      example: 'qianlfeg@gmail.com',
      description: '邮箱',
    },
  },
  AccountAddResponse: {
    status: {
      type: 'boolean',
    },
  },

}

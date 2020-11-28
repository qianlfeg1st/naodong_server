module.exports = {

  loginRequest: {
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
  },
  loginResponse: {
    token: {
      type: 'string',
      example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
    },
    account: {
      type: 'string',
      example: 'qianlfeg',
    },
  },

}

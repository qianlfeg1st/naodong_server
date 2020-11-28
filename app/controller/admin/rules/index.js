export default {
  login: {
    account: {
      type: 'string',
      min: 6,
      message: {
        required: '必须输入账号',
        min: '账号必须大于6位',
        empty: '账号不能为空',
      },
    },
    password: {
      type: 'password',
      min: 3,
      message: {
        required: '必须输入密码',
        min: '密码必须大于5位',
        empty: '密码不能为空',
      },
    },
  },
}

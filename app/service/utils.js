import { Service } from 'egg'
import md5 from 'md5'
import jwt from 'jsonwebtoken'
import Parameter from './modules/parameter'
const parameter = new Parameter({
  validateRoot: true,
})

import sleep from './modules/sleep'
import csv from './modules/csv'

class UtilsService extends Service {

  async sleep (time) {

    return sleep(time)
  }

  async csv (...e) {

    return csv(...e)
  }

  // 生成MD5
  async md5 (str) {

    return md5(str)
  }

  // 校验参数
  async validate (ctx, rule, data) {

    const res = parameter.validate(rule, data)

    if (res) {

      // HTTP 表示参数缺失或校验不通过
      ctx.status = 422
      ctx.body = res

      return ctx
    }
  }

  // 生成jwt-token
  async encodeToken (data, expiresIn = 86400) {

    return jwt.sign(data, this.config.jwt_sign, {
      expiresIn,
    })
  }

  // 解析jwt-token
  async decodeToken (data) {

    try {

      return jwt.verify(data, this.config.jwt_sign)
    } catch (error) {

      // console.log('~~error~~', error)
    }
  }

  // 获取token
  async getToken (header) {

    return header.token
  }
}

export default UtilsService

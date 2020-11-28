import { Service } from 'egg'
import path from 'path'
import OSS from 'ali-oss'
import { v1 as uuidv1 } from 'uuid'

const ossConfig = require(`${process.cwd()}/config/userConfig`).oss
const client = new OSS(ossConfig)

class OssService extends Service {

  async upload ({ file, pathName }) {

    try {

      const { res } = await client.put(`${pathName}/${uuidv1()}${path.extname(file)}`, file)

      // console.log('~~put~~', res)
      if (res.statusMessage === 'OK') {

        this.ctx.logger.warn('图片上传到OSS成功', res)
      } else {

        this.ctx.logger.error('图片上传到OSS失败', new Error(res))
      }
    } catch (error) {

      this.ctx.logger.error('图片上传到OSS失败', error)
    }
  }

}

export default OssService

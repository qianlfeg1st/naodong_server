import { Service } from 'egg'
import tencentcloud from 'tencentcloud-sdk-nodejs'

const { secretId, secretKey } = require(`${process.cwd()}/config/userConfig`).tencent
const { Credential, ClientProfile, HttpProfile } = tencentcloud.common
const { Client, Models } = tencentcloud.ocr.v20181119

const httpProfile = new HttpProfile()
httpProfile.endpoint = 'ocr.tencentcloudapi.com'

const clientProfile = new ClientProfile()
clientProfile.httpProfile = httpProfile

const client = new Client(new Credential(secretId, secretKey), 'ap-beijing', clientProfile)

class OrcService extends Service {

  getLicenseInfo (ImageBase64) {

    return new Promise(resolve => {

      try {

        const req = new Models.DriverLicenseOCRRequest()
        req.ImageBase64 = ImageBase64
        req.CardSide = 'BACK'

        // console.log('~~~req~~~~', req)

        client.DriverLicenseOCR(req, (errMsg, response) => {

          if (errMsg) {

            resolve(null)

            this.ctx.logger.warn('驾驶证识别失败', new Error(JSON.stringify(errMsg)))

            return
          }

          this.ctx.logger.warn('驾驶证识别成功', response)

          resolve({
            cardCode: response.CardCode,
            archivesCode: response.ArchivesCode,
          })
        })
      } catch (error) {

        this.ctx.logger.warn('驾驶证识别失败', new Error(error))

        resolve(null)
      }
    })
  }

}

export default OrcService

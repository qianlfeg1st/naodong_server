import iconv from 'iconv-lite'

export default (content, data = []) => {

  return new Promise((resolve, reject) => {

    try {

      content += '\n'

      data.forEach(item => {

        Object.keys(item).forEach(e => {

          content += `"${item[e].toString().replace(/"/g, `""`)}\t",`
        })

        content += '\n'
      })

      // 不转换编码格式会乱码
      resolve(iconv.encode(Buffer.from(content), 'gb2312'))
    } catch (error) {

      reject(error)
    }
  })
}

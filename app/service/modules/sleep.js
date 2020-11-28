/**
 * 睡眠
 * @param { Number } time 睡眠时间
 * @return { Promise } 返回Promise对象
 */
export default time => {

  return new Promise(resolve => {

    setTimeout(() => {

      resolve(true)
    }, time)
  })
}

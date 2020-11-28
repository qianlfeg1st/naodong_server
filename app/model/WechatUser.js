export default app => {

  const mongoose = app.mongoose
  const Schema = mongoose.Schema

  const schema = new Schema({
    appid: { type: String, default: '' },
    avatarUrl: { type: String, default: '' },
    nickName: { type: String, default: '' },
    province: { type: String, default: '' },
    city: { type: String, default: '' },
    country: { type: String, default: '' },
    // 0表示未知，1男性 2女性
    gender: { type: String, default: 0 },
    openId: { type: String },
    // 注册时间
    add_time: { type: Number, default: 0 },
  }, {
    versionKey: false,
  })

  return mongoose.model('WechatUser', schema, 'wechatUser')
}

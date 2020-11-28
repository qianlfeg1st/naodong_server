export default app => {

  const mongoose = app.mongoose
  const Schema = mongoose.Schema

  const schema = new Schema({
    avatarUrl: { type: String, default: '' },
    nickName: { type: String, default: '' },
    province: { type: String, default: '' },
    city: { type: String, default: '' },
    country: { type: String, default: '' },
    // 0表示未知，1男性 2女性
    gender: { type: String, default: 0 },
    accessToken: { type: String, default: '' },
    alipayUserId: { type: String, default: '' },
    userId: { type: String, default: '' },
    // 注册时间
    add_time: { type: Number, default: 0 },
  }, {
    versionKey: false,
  })

  return mongoose.model('AlipayUser', schema, 'alipayUser')
}

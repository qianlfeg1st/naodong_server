export default app => {

  const mongoose = app.mongoose
  const Schema = mongoose.Schema

  const AccountSchema = new Schema({
    account: { type: String },
    // name: { type: String },
    password: { type: String },
    mobile: { type: String },
    email: { type: String },
    // 是否禁用 1.表示启用
    status: { type: Number, default: 1 },
    add_time: { type: Number, default: new Date().getTime() },
    // 最后登录的ip
    last_ip: { type: String, default: '0.0.0.0' },
    // 是否是超级管理员 1.表示超级管理员
    is_super: { type: Number, default: 0 },
  }, {
    versionKey: false,
  })

  return mongoose.model('Account', AccountSchema, 'account')
}

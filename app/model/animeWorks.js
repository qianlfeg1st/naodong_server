export default app => {

  const mongoose = app.mongoose
  const Schema = mongoose.Schema

  const schema = new Schema({
    // 中文名
    chinese_name: { type: Array, default: '' },
    // 英文名
    english_name: { type: Array, default: '' },
    // 原名
    orgin_name: { type: Array, default: '' },
    // 其他名称
    other_name: { type: Array, default: '' },
    // 上映日期
    release_date: { type: Number, default: 0 },
    // 集数
    length: { type: Number, default: '' },
    // 语言
    language: { type: String, default: '' },
    // 类型
    type: { type: Array, default: [] },
    // 封面
    cover: { type: String, default: '' },
    // 官网
    website: { type: String, default: '' },
    // 地区
    region: { type: String, default: '' },
    // 导演
    director: { type: Array, default: [] },
    // 编剧
    writers: { type: Array, default: [] },
    // 演员
    actor: { type: Array, default: [] },
    // 关键词
    keyword: { type: Array, default: [] },
    // imdb链接
    imdb_url: { type: String, default: '' },
    // 豆瓣链接
    douban_url: { type: String, default: '' },
    // 豆瓣评分
    douban_score: { type: String, default: '' },
    // 更新时间
    update_time: { type: Number, default: 0 },
    // 创建时间
    create_time: { type: Number, default: 0 },
  }, {
    versionKey: false,
  })

  return mongoose.model('AnimeWorks', schema, 'animeWorks')
}

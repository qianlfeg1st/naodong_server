export default app => {

  const mongoose = app.mongoose
  const Schema = mongoose.Schema

  const StationSchema = new Schema({
    // 高德POI
    poi: {
      type: String,
    },
    // 高德区名称
    adname: {
      type: String,
    },
    // 高德区编码
    adcode: {
      type: String,
    },
    // 加油站名称
    name: {
      type: String,
    },
    address: {
      type: String,
    },
    tel: {
      type: String,
    },
    longitude: {
      type: String,
    },
    latitude: {
      type: String,
    },
    cityCode: {
      type: String,
      default: '0000',
    },
    cityName: {
      type: String,
      default: '0000',
    },
  }, {
    versionKey: false,
  })

  return mongoose.model('Station', StationSchema, 'station')
}

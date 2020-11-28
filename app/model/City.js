export default app => {

  const mongoose = app.mongoose
  const Schema = mongoose.Schema

  const CitySchema = new Schema({
    name: {
      type: String,
    },
    level: {
      type: String,
    },
    center: {
      type: String,
    },
    adcode: {
      type: String,
    },
    citycode: {
      type: String,
    },
    districts: {
      type: String,
    },
  }, {
    versionKey: false,
  })

  return mongoose.model('City', CitySchema, 'city')
}

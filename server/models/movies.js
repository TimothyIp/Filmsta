const mongoose = require('mongoose'),
Schema = mongoose.Schema;

const MovieSchema = new Schema({
  movieTitle: String,
  require: true
})

module.exports = mongoose.model('Movie', MovieSchema);
const mongoose = require('mongoose'),
Schema = mongoose.Schema;

const MovieSchema = new Schema({
  movieTitle: {
    type: String,
    required: true
  },
  backdrop_path: {
    type: String
  },
  overview: {
    type: String
  },
  poster_path: {
    type: String
  },
  release_date: {
    type: String
  }
})

module.exports = mongoose.model('Movie', MovieSchema);
const axios = require('axios');
const API_URL = 'https://api.themoviedb.org/3/search/movie';
const config = require('../config/main');
const API_KEY = config.api_key;

exports.searchShow = (req, res, next) => {
  const movieName = req.params.movieName;
  const movieDbCall = `${API_URL}?api_key=${API_KEY}&include_adult=false&language=en-US&page=1&query=${movieName}`;
  let moviesReturned = [];
  
  function sendMovieResponse() {
    return res.status(200).json({
      message: `Searching for ${movieName}`,
      response: moviesReturned,
    })
  }

  async function sendMovieRes() {
    try {
      const movieCall = await axios(movieDbCall);
      if(movieCall.data.results.length > 1) {
        moviesReturned = {
          moviesRequested: movieCall.data
        }
      } else {
        return res.status(400).json({
          error: "Movie could not be found."
        })
        return next();
      }
      const movieResponse = await sendMovieResponse();
      return movieResponse;
    } catch(e) {
      console.log(e)
    }
  } 

  sendMovieRes();
}
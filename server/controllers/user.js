const User = require('../models/user');

const setUserInfo = function (request) {
  const getUserInfo = {
    _id: request._id,
    firstName: request.profile.firstName,
    lastName: request.profile.lastName,
    username : request.username,
    email: request.email,
    role: request.role,
    movies: request.movies
  };

  return getUserInfo;
};

const setViewedUserInfo = function (request) {

  const getUserInfo = {
    username: request.username,
    role: request.role,
    firstName: request.profile.firstName,
    movies: request.movies
  };



  return getUserInfo;
};

exports.viewProfile = function(req, res, next) {
  const userId = req.params.userId;

  if (req.user._id.toString() !== userId) {
    return res.status(401).json({
      error: "You are not authorized to view this user profile."
    });
  }

  User.findById(userId, (err, user) => {
    if (err) {
      res.status(400).json({
        error: "No user could be found with this ID."
      });
      return next(err);
    }

    const userToReturn = setUserInfo(user);

    return res.status(200).json({
      user: userToReturn
    })
  });
}

exports.viewPage = function(req, res, next) {
  const viewedUsername = req.params.username;
  
  User.findOne({ username: viewedUsername }, (err, user) => {

    if (user === null || err) {
      res.status(400).json({
        error: "No user could be found with this username."
      });
      return next(err);
    }
    const userToReturn = setViewedUserInfo(user);

    return res.status(200).json({
      user: userToReturn
    })
  })
}

exports.addToUserCollection = function(req, res , next) {
  const movieTitle = req.body.movie.title;
  const backdrop_path = req.body.movie.backdrop_path;
  const overview = req.body.movie.overview;
  const poster_path = req.body.movie.poster_path;
  const release_date = req.body.movie.release_date
  const userId = req.user._id;

  // console.log("moviestoadd", movieTitle)
  // console.log(req.user._id)
  User.findById(userId, (err, foundUser) => {
    if (err) {
      res.status(400).json({
        error: 'No user found.'
      })
      return next(err);
    }

    if (foundUser) {
      const movieInfo = {
        movieTitle: movieTitle,
        backdrop_path: backdrop_path,
        overview: overview,
        poster_path: poster_path,
        release_date: release_date
      }
      foundUser.movies.push(movieInfo);
      
      foundUser.save((error) => {
        if (error) {
          return next(error);
        }

        return res.status(200).json({
          message: 'Movie added to users collection',
          added: movieInfo
        }) 
      })
    }
  });
}

exports.removeFromUserCollection = function(req, res, next) {  
  const removedMovie = req.body.movie;
  const userId = req.user._id;
  
  User.findById(userId, (err, foundUser) => {
    if (err) {
      res.status(400).json({
        error: 'No user found.'
      })
      return next(err);
    }

    if (foundUser) {
      const movieList = foundUser.movies;
      
      for (let i = movieList.length - 1; i >= 0; i--) {
        if (movieList[i].movieTitle === removedMovie) {
          movieList.splice(i,1);
        }
      }
      foundUser.save((error) => {
        if (error) {
          return next(error);
        }

        return res.status(200).json({
          message: 'Movie removed from users collection.',
          removedMovie: removedMovie
        })
      });
    }
  });
}

exports.addToUserReviews = function(req, res, next) {
  const userId = req.user._id;
  const movie = req.body.reviewData.movieName;
  const usersReview = req.body.reviewData.content;
  const rating = req.body.reviewData.rating;

  User.findById(userId, (err, foundUser) => {
    if (err) {
      res.status(400).json({
        error: 'No user found.'
      })
      return next(err);
    }

    if (foundUser) {
      for (let i = 0; i < foundUser.movies.length; i++) {
        if (foundUser.movies[i].movieTitle === movie) {
          foundUser.movies[i].review = {
            content: usersReview,
            rating
          }
        }
      }

      foundUser.save((err) => {
        if (err) {
          return next(err);
        }

        return res.status(200).json({
          message: "Added Review"
        })
      })
    }
  })
}
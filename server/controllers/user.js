const User = require('../models/user');
      
const setUserInfo = function (request) {
  const getUserInfo = {
    _id: request._id,
    firstName: request.profile.firstName,
    lastName: request.profile.lastName,
    username : request.username,
    email: request.email,
    role: request.role
  };

  return getUserInfo;
};

const setViewedUserInfo = function (request) {
  const getUserInfo = {
    username: request.username,
    role: request.role,
    firstName: request.profile.firstName
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
  const testing = req.body;

  console.log(testing);
}

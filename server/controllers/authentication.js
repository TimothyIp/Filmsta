"use strict"

const jwt = require('jsonwebtoken'),
      crypto = require('crypto'),
      User = require('../models/user'),
      config = require('../config/main');

function generateToken(user) {
  return jwt.sign(user, config.secret, {
    expiresIn: 20000
  });
}

function setUserInfo(req) {
  return {
    _id: req._id,
    firstName: req.profile.firstName,
    lastName: req.profile.lastName,
    email: req.email,
    role: req.role,
  }
}

// LOGIN ROUTE
exports.login = function(req, res, next) {
  let userInfo = setUserInfo(req.user);

  res.status(200).json({
    token: 'JWT ' + generateToken(userInfo),
    user: userInfo
  })
}

// REGISTRATION ROUTE
exports.register = function(req, res, next) {
  const email = req.body.email;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const password = req.body.password;

  if (!email) {
    return res.status(422).send({
      error: 'You must enter an email address.'
    });
  }

  if (!firstName || !lastName) {
    return res.status(422).send({
      error: 'You must enter your full name.'
    });
  }

  if (!password) {
    return res.status(422).send({
      error: 'You must enter a password.'
    })
  }

  User.findOne({ email: email }, function(err, existingUser) {
    if (err) {
      return next(err);
    }

    if (existingUser) {
      return res.status(422).send({
        error: 'That email address is already in use'
      });
    }

    //If email is unique and password is provied -> create account
    let user = new User({
      email: email,
      password: password,
      profile: {
        firstName: firstName,
        lastName: lastName
      }
    });

    user.save(function(err, user) {
      if (err) {
        return next(err);
      }

      let userInfo = setUserInfo(user);

      res.status(201).json({
        token: 'JWT ' + generateToken(userInfo),
        user: userInfo
      });
    });
  });
}

// Role authorization check
exports.roleAuthorization = function(role) {
  return function(req, res, next) {
    const user = req.user;

    User.findById(user._id), function(err, foundUser) {
      if (err) {
        res.status(422).json({
          error: 'No user was found.'
        })
      }

      if (foundUser.role == role) {
        return next();
      }

      res.status(401).json({
        error: 'You are not authorized to view this content.'
      });

      return next('Unauthorized');
    }
  }
}
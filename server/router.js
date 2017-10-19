const AuthenicationController = require('./controllers/authentication'),
      express = require('express'),
      passportService = require('./config/passport'),
      passport = require('passport');

//Middleware for login/auth
const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });


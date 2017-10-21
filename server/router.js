const AuthenicationController = require('./controllers/authentication'),
      express = require('express'),
      passportService = require('./config/passport'),
      passport = require('passport'),
      UserController = require('./controllers/user');

//Middleware for login/auth
const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

module.exports = function(app) {
  const apiRoutes = express.Router(),
        authRoutes = express.Router(),
        userRoutes = express.Router();


  // AUTH ROUTES

  apiRoutes.use('/auth', authRoutes);

  // Registration route
  authRoutes.post('/register', AuthenicationController.register);

  // Login route
  authRoutes.post('/login', requireLogin, AuthenicationController.login);

  // User Routes
  apiRoutes.use('/user', userRoutes);

   //View a user's profile
  userRoutes.get('/:username', UserController.viewPage);

  // View user's profile settings route
  userRoutes.get('/:userId', requireAuth, UserController.viewProfile);


  // Set url for API group routes
  app.use('/api', apiRoutes);
}
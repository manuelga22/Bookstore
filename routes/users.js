const Page = require('./page');
const { getIdParam, flash } = require('../helpers');
const { models } = require('../sequelize');
const express = require('express');
const router = express.Router();
var crypto = require('crypto');
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
var User = require('../sequelize/models/user.js').User;

class Users extends Page {
  constructor() {
    // Add custom routes here, before super()...

    super(router);

    // Placeholder for singleton after merging William's branch
    this.currentUser = models.User.build({id: 1});

    router.get("/api/users/:id/wish_lists", this.wishLists.bind(this));


    passport.use(new LocalStrategy ({
      usernameField: 'email',
      passwordField: 'password'
    },
    async function(email, password, done) {
      var user = await models.User.findOne(
        { where: {
            email: email,
            password: password
          }
        });
      if (user == null) {
        return done(null, false, { message: 'Incorrect email/password.'});
      }
      if (!isValidPassword(password)) {
        return done(null, false, { message: 'Incorrect email/password.' });
      }
      return done(null, user);
    }

    
  ));

  function isValidPassword(password) {
    if (password.length >= 8) {
      return true;
    }
    return false;
  }
  
  
  }

  
  
  router() { return router; }

  // Add more api methods here...

  

  

  async wishLists(req, res) {
    const object = await this.currentUser.wishLists();
    
    res.status(200).json(object);
  }

  
}

module.exports = Users
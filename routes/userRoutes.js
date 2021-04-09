// will contain the log-in and sign up routes
const Page = require('./page');
const { models } = require('../sequelize');
const express = require('express');
const router  = express.Router();
var crypto = require('crypto');
const sequelize = require('../sequelize');
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;



class userRoutes extends Page{
    constructor(){
        router.get('/log-in', (req, res, next) => {
            res.render('users/logIn');
        });
        router.get('/sign-up', (req, res, next) => {
            res.render('users/signUp');
        });
        router.get('/profile',(req,res)=>{
            res.render('users/profile', {
                firstName: req.session.user.firstName,
                lastName: req.session.user.lastName,
                email: req.session.user.email,
                address: req.session.user.address,
                password: req.session.user.password,
                username: req.session.user.username
            });
        });


        router.post('/register', async function(req, res, next) {
          var formData = req.body;
          var formEmail = formData.email;
          var formPassword = formData.psw;
          var salt = crypto.randomBytes(64).toString('hex');
          var password = crypto.pbkdf2Sync(formPassword, salt, 10000, 64, 'sha512').toString('base64');
        
          if (!isValidPassword(password)) {
            return res.json({status: 'error', message: 'Password must be 8 or more characters.'});
          }
          if (!isValidEmail(formEmail)) {
            return res.json({status: 'error', message: 'Email address not formed correctly.'});
          }
        
          try {
            var user = await sequelize.models.User.bulkCreate([
              {
                firstName: " ",
                lastName: " ",
                username: " ",
                password: formPassword,
                email: formEmail,
                address: " "
            }
          ]);
          } catch (err) {
            return res.json({status: 'error', message: 'Email address already exists.'});
          }
          if (user) {
            passport.authenticate('local', function(err, user, info) {
              if (err) { return next(err); }
              console.log(user);
              if (!user) {
                return res.redirect("/");
            
              }
              req.logIn(user, function(err) {
                if (err) { return next(err); }
                return res.redirect("/profile");
              });
            })(req, res, next);
          }
        });

        
        router.post('/login', function(req, res, next) {
          passport.authenticate('local', function(err, user, info) {
            if (err) { return next(err); }
            if (!user) {
              return res.json({status: 'error', message: info.message});
            }
            req.logIn(user, function(err) {
              if (err) { return next(err); }
              req.session.user = user;
              return res.redirect("/");
            });
          })(req, res, next);
        });

        // router.post('/logout', function(req, res){
        //   res.locals.user = false;
        //   req.session.user = false;
        //   res.redirect('/');
        // });

        router.post('/update', (req, res, next) => {

          let updateValues = { 
            firstName: req.body.first_name,
            lastName: req.body.last_name,
            email: req.body.email,
            address: req.body.address,
            password: req.body.password,
            username: req.body.username
           };

           
           if (req.body.password == req.body.password2) {
            sequelize.models.User.update(updateValues, { where: { id: req.session.user.id } }).then((result) => {
              // here your result is simply an array with number of affected rows
              console.log(result);
              // [ 1 ]
             });
              req.session.user.firstName = req.body.first_name,
              req.session.user.lastName = req.body.last_name,
              req.session.user.email = req.body.email,
              req.session.user.address = req.body.address,
              req.session.user.password = req.body.password
              req.session.user.username = req.body.username
              return res.redirect("/profile");
            } else {
              return res.json({status: 'error', message: 'Passwords do not match.'});
            }


        });
        
      super(router);

      //checks if password has > 8 chars
      function isValidPassword(password) {
        if (password.length >= 8) {
          return true;
        }
        return false;
      }

      //uses a regex to check if email is valid
      function isValidEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
      }
    }
    router() { return router; }

}




module.exports = userRoutes;

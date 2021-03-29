// will contain the log-in and sign up routes
const Page = require('./page');
const { models } = require('../sequelize');
const express = require('express');
const router  = express.Router();


class userRoutes extends Page{
    constructor(){
        router.get('/log-in', (req, res, next) => {
            res.render('users/logIn');
        });
        router.get('/sign-up', (req, res, next) => {
            res.render('users/signUp');
        });
        router.get('/profile/:id',(req,res)=>{
            res.render('users/profile');
        })
        
      super(router);
    }
    router() { return router; }

    
    async logIn(){

    }
    async signUp(req,res){

        var salt = crypto.randomBytes(64).toString('hex');
        var password = crypto.pbkdf2Sync(req.body.password, salt, 10000, 64, 'sha512').toString('base64');
      
        if (!isValidPassword(req.body.password)) {
          return res.json({status: 'error', message: 'Password must be 8 or more characters.'});
        }
        if (!isValidEmail(req.body.email)) {
          return res.json({status: 'error', message: 'Email address not formed correctly.'});
        }
      
        try {
          var user = await User.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            role: "user",
            password: password,
            salt: salt
          });
        } catch (err) {
          return res.json({status: 'error', message: 'Email address already exists.'});
        }
        if (user) {
          passport.authenticate('local', function(err, user, info) {
            if (err) { return next(err); }
            if (!user) {
              return res.json({status: 'error', message: info.message});
            }
            req.logIn(user, function(err) {
              if (err) { return next(err); }
              return res.json({status: 'ok'});
            });
          })(req, res, next);
        }

    };

    isValidEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    isValidPassword(password) {
        if (password.length >= 8) {
          return true;
        }
        return false;
    }
      


}




module.exports = userRoutes;

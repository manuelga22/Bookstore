// will contain the log-in and sign up routes
const express = require('express');
const router  = express.Router();

router.get('/log-in', (req, res, next) => {
    res.render('logIn');
});

router.get('/sign-up', (req, res, next) => {
    res.render('signUp');
});

router.get('/profile', (req, res, next) => {
    res.render('profile');
});


module.exports = router;

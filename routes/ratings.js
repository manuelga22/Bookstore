const Page = require('./page');
const { getIdParam, flash } = require('../helpers');
const { models } = require('../sequelize');
const express = require('express');
const router = express.Router();

class Ratings extends Page {
  constructor() {
    // Add custom routes here, before super()...

    super(router);
  }
  
  router() { return router; }

  // Add more api methods here...

  index(req, res, customObject = {}) {
    super.index(req, res, {
      urls: {
        create: this.createPageUrl()
      }
    });
  }

  createAction(req, res) {
    console.log(req.body.rating)
    this.post(this.createApiUrl(), req.body.rating, (success) => {
      res.redirect(`/books/${success.data.BookId}`);
    }, (error) => {
      console.error(error);
    });
  }

}

module.exports = Ratings
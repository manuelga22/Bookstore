const Page = require('./page');
const { getIdParam } = require('../helpers');
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

}

module.exports = Ratings
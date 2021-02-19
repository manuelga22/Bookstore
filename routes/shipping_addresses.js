const Page = require('./page');
const { getIdParam } = require('../helpers');
const { models } = require('../sequelize');
const express = require('express');
const router = express.Router();

class ShippingAddresses extends Page {
  constructor() {
    // Add custom routes here, before super()...

    super(router);
  }
  
  router() { return router; }

  // Add more api methods here...
}

module.exports = ShippingAddresses
const Page = require('./page');
const { getIdParam, flash } = require('../helpers');
const { models } = require('../sequelize');
const express = require('express');
const router = express.Router();

class WishListItems extends Page {
  constructor() {
    // Add custom routes here, before super()...
  
    super(router);
  }
  
  router() { return router; }

  // Add more api methods here...
  destroyAction(req, res) {
    this.delete(this.destroyApiUrl(req.params.id), (success) => {
      res.redirect(`/wish_lists/${req.params.id}?success=Book has been removed from your wish list.`);
    }, (error) => {
      console.error(error);
    });
  }
}

module.exports = WishListItems
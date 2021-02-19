const Page = require('./page');
const { getIdParam } = require('../helpers');
const { models } = require('../sequelize');
const express = require('express');
const router = express.Router();

class WishLists extends Page {
  constructor() {
    // Add custom routes here, before super()...
    router.get('/wish_lists/test', (req, res, next) => {
      res.render('wishLists/test');
    });
    
    super(router);
  }

  router() { return router; }

  // API example
  async items(req, res) {
    // We can avoid fetching the WishList object from the DB
    // and instantiate a placeholder with just the ID which we have.
    // It's the only bit needed to query the DB for items.
    const wishList = models.WishList.build({id: getIdParam(req)});
    const objects = await wishList.getWishListItems(); // Method automatically added by Sequelize
    
    res.status(200).json(objects);
  }
  // API example
  async user(req, res) {
    const wishList = models.WishList.findByPk(getIdParam(req));
    const object = await wishList.getUser(); // Method automatically added by Sequelize
    
    res.status(200).json(object);
  }
}

module.exports = WishLists
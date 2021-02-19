const Page = require('./page');
const { getIdParam } = require('../helpers');
const { models } = require('../sequelize');
const express = require('express');
const router = express.Router();

class WishListItems extends Page {
  constructor() {
    // Add custom routes here, before super()...
    router.get('/wish-list',(req,res,next)=>{
      res.render("shoppingCart/shoppingCart")
    })
    super(router);
  }
  
  router() { return router; }

  // Add more api methods here...
}

module.exports = WishListItems
const Page = require('./page');
const { getIdParam } = require('../helpers');
const { models } = require('../sequelize');
const express = require('express');
const router = express.Router();

class ShoppingCartItems extends Page {
  constructor() {
    // Add custom routes here, before super()...
    // router.get('/shopping-cart',(req,res,next)=>{
    //   res.render("shoppingCart/index")
    // })
    super(router);
  }
  
  router() { return router; }



  // Add more api methods here...
}

module.exports = ShoppingCartItems
const Api = require('./api');



class ShoppingCartItems extends Api {
  constructor() {
    super(router)
  }


  router(){return router}
  // Add more api methods here...
}

module.exports = ShoppingCartItems
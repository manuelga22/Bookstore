const Page = require('./page');
const { getIdParam, flash } = require('../helpers');
const { models } = require('../sequelize');
const express = require('express');
const router = express.Router();

class Users extends Page {
  constructor() {
    // Add custom routes here, before super()...

    super(router);

    // Placeholder for singleton after merging William's branch
    this.currentUser = models.User.build({id: 1});

    router.get("/api/users/:id/wish_lists", this.wishLists.bind(this));
  }
  
  router() { return router; }

  // Add more api methods here...

  async wishLists(req, res) {
    const object = await this.currentUser.wishLists();
    
    res.status(200).json(object);
  }
}

module.exports = Users
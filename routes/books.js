const Page = require('./page');
const { getIdParam, flash } = require('../helpers');
const { models } = require('../sequelize');
const express = require('express');
const user = require('../sequelize/models/user');
const book = require('../sequelize/models/book');
const router = express.Router();

class Books extends Page {
  constructor() {
    // Add custom routes here, before super()...
    
    
    super(router);
  }
  
  router() { return router; }

  show(req, res) {
    if (req.session.user) {
      this.get(this.userWishListsApiUrl(req.session.user.id), (wishListsSuccess) => {
        // Remove the current wish list from the results since we can't transfer to it
        let wishLists = wishListsSuccess.data
        
        super.show(req, res, {
          wishLists: wishLists,
          hasMultipleWishlists: wishLists.length > 0,
          urls: {
            create: "/ratings",
            edit: this.editPageUrl(req.params.id),
            delete: this.destroyPageUrl(req.params.id)
          }
        });
      }, (wishListsError) => {
        console.error(wishListsError);
      });
    } else {
      super.show(req, res)
    }
  }

  // Add more api methods here...
  async all(req, res) {
    const books = await models.Book.findAll({include: models.Author });
    res.status(200).json(books);
  };

  async find(req, res) {
    const id = getIdParam(req);
    const book = await models.Book.findOne({include: [models.Author, models.Rating], where: {id: id}})

    console.log(book)
    res.status(200).json(book);
    
  }

  // URLs
  userWishListsApiUrl(id) {
    return `${this.baseUrl}/api/users/${id}/wish_lists`;
  }
}

module.exports = Books
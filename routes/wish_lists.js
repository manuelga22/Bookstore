const Page = require('./page');
const { getIdParam } = require('../helpers');
const { models } = require('../sequelize');
const express = require('express');
const router = express.Router();
const pluralize = require('pluralize');

class WishLists extends Page {
  constructor() {
    // Add custom routes here, before super()...
    
    super(router);

    // Placeholder for singleton while waiting to merging William's branch
    this.currentUser = models.User.build({id: 1, username: "Orlando"});
    this.maxWishListCount = 3;

    // API methods
    router.get("/api/wish_lists/:id/items", this.items.bind(this));
  }

  router() { return router; }

  // Example of how to pass a custom object to a common page route
  index(req, res) {
    super.index(req, res, {
      message: "Hello world",
      user: this.currentUser,
      another_object: {
        message: "Hello again"
      }
    });
  }

  new(req, res) {
    this.get(this.userWishListsApiUrl(this.currentUser.id), (success) => {
      const wishListCount = success.data.length;
      // Validate number of allowed wish lists
      if (wishListCount >= this.maxWishListCount) {
        res.redirect(`/wish_lists?danger=You are only allowed to create ${pluralize('wish list', this.maxWishListCount, true)}.`);
      } else {
        super.new(req, res);
      }
    }, (error) => {
      console.error(error);
    });
  }

  show(req, res) {
    this.get(this.itemsApiUrl(req.params.id), (success) => {
      var items = [];
      success.data.forEach(function(item) {
        items.push(item);
      });
      
      super.show(req, res, {items: items});
    }, (error) => {
      console.error(error);
    });
  }

  createAction(req, res) {
    req.body.wishList.UserId = this.currentUser.id;
    super.createAction(req, res);
  }

  // Limit wish lists for the logged in user only
  async all(req, res) {
    const objects = await models.WishList.findAll({where: {UserId: this.currentUser.id}});
    res.status(200).json(objects);
  }

  async items(req, res) {
    // We can avoid fetching the WishList object from the DB
    // and instantiate a placeholder with just the ID which we have.
    // It's the only bit needed to query the DB for items.
    const wishList = models.WishList.build({id: getIdParam(req)});
    const objects = await wishList.getWishListItems({include: models.Book}); // Method automatically added by Sequelize
    
    res.status(200).json(objects);
  }
  // API example
  async user(req, res) {
    const wishList = models.WishList.findByPk(getIdParam(req));
    const object = await wishList.getUser(); // Method automatically added by Sequelize
    
    res.status(200).json(object);
  }

  // URLs
  itemsApiUrl(id) {
    return `${this.baseUrl}/api/wish_lists/${id}/items`;
  }
  userWishListsApiUrl(id) {
    return `${this.baseUrl}/api/users/${id}/wish_lists`;
  }
}

module.exports = WishLists
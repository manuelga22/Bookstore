const Page = require('./page');
const { getIdParam, flash } = require('../helpers');
const { models } = require('../sequelize');
const express = require('express');
const router = express.Router();

class WishListItems extends Page {
  constructor() {
    // Add custom routes here, before super()...
  
    super(router);

    // Placeholder for singleton while waiting to merging William's branch
    this.currentUser = models.User.build({id: 1, username: "Orlando"});
  }
  
  router() { return router; }

  createAction(req, res) {
    flash(req, {success: "Book has been successfully added."});
    this.post(this.createApiUrl(), req.body.wishListItem, (success) => {
      res.redirect(`/wish_lists/${req.body.wishListItem.WishListId}`);
    }, (error) => {
      flash(req, {danger: "That book is already in this wish list."});
      res.redirect(`/wish_lists/${req.body.wishListItem.WishListId}`);
      console.error(error);
    });
  }

  updateAction(req, res) {
    flash(req, {success: "Book has been successfully transferred."});
    this.put(this.updateApiUrl(req.params.id), req.body.wishListItem, (success) => {
      res.redirect(`/wish_lists/${req.body.wishListItem.WishListId}`);
    }, (error) => {
      flash(req, {danger: "That book is already in this wish list."});
      res.redirect(`/wish_lists/${req.body.wishListItem.WishListId}`);
      console.error(error);
    });
  }

  destroyAction(req, res) {
    this.delete(this.destroyApiUrl(req.params.id), (success) => {
      flash(req, {success: "Book has been removed from your wish list."});
      res.redirect(`/wish_lists/${req.params.id}`);
    }, (error) => {
      console.error(error);
    });
  }
}

module.exports = WishListItems
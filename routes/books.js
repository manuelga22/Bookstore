const Page = require('./page');
const { getIdParam } = require('../helpers');
const { models } = require('../sequelize');
const express = require('express');
const router = express.Router();

class Books extends Page {
  constructor() {
    // Add custom routes here, before super()...
    
    
    super(router);
  }
  
  router() { return router; }

  // Add more api methods here...
  async all(req, res) {
    const books = await models.Book.findAll({include: models.Author});
    res.status(200).json(books);
  };

  async find(req, res) {
    const id = getIdParam(req);
    const book = await models.Book.findOne({include: models.Author, where: {id: id}})
    res.status(200).json(book);
  }
}

module.exports = Books
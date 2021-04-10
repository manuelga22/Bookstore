const Page = require('./page');
const { getIdParam, flash } = require('../helpers');
const { models } = require('../sequelize');
const express = require('express');
const router = express.Router();

class Authors extends Page {
  constructor() {
    // Add custom routes here, before super()...

    super(router);
  }
  
  router() { return router; }

  // Add more api methods here...
  async all(req, res) {
    const authors = await models.Author.findAll({include: models.Book });
    res.status(200).json(authors);
  };

  async find(req, res) {
    const id = getIdParam(req);
    const author = await models.Author.findOne({include: [models.Book], where: {id: id}})
      
    console.log(author)
    res.status(200).json(author);
  }
}

module.exports = Authors
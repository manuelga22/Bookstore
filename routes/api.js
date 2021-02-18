// Common API methpds used by all models
const { models } = require('../sequelize');
const { getIdParam } = require('../helpers');
const { singularize } = require('sequelize/lib/utils');

class Api {
  async all(req, res) {
    const objects = await models[singularize(this.name)].findAll();
    
    res.status(200).json(objects);
  };

  async find(req, res) {
    const id = getIdParam(req);
    const object = await models[singularize(this.name)].findByPk(id);
    
    if (object) {
      res.status(200).json(object);
    } else {
      res.status(404).send('404 - Not found');
    }
  };

  async create(req, res) {
    await models[singularize(this.name)].create(req.body);

    res.status(201).end();
  };

  async update(req, res) {
    const id = getIdParam(req);
    
    await models[singularize(this.name)].update(req.body, { where: { id: id } });

    res.status(200).end();
  };

  async destroy(req, res) {
    const id = getIdParam(req);

    await models[singularize(this.name)].destroy({ where: { id: id } });

    res.status(200).end();
  };
}

module.exports = Api
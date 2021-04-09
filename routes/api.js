// Common API methpds used by all classes
const { models } = require('../sequelize');
const { getIdParam } = require('../helpers');
const { singularize } = require('sequelize/lib/utils');
const humps = require('humps');

class Api {
  constructor(router) {
    this.baseUrl = "";
    this.resourceName = humps.decamelize(this.constructor.name);
    this.initApiRoutes(router);
  }
  
  // We create a wrapper to workaround async errors not being transmitted correctly.
  static makeHandlerAwareOfAsyncErrors(handler) {
    return async function(req, res, next) {
      try {
        await (handler(req, res));
      } catch (error) {
        next(error);
      }
    };
  }

  initApiRoutes(router) {
    // Creates routes for all common RESTful API methods
    router.get(`/api/${this.resourceName}`, Api.makeHandlerAwareOfAsyncErrors(this.all.bind(this)));
    router.get(`/api/${this.resourceName}/:id`, Api.makeHandlerAwareOfAsyncErrors(this.find.bind(this)));
    router.post(`/api/${this.resourceName}`, Api.makeHandlerAwareOfAsyncErrors(this.create.bind(this)));
    router.put(`/api/${this.resourceName}/:id`, Api.makeHandlerAwareOfAsyncErrors(this.update.bind(this)));
    router.delete(`/api/${this.resourceName}/:id`, Api.makeHandlerAwareOfAsyncErrors(this.destroy.bind(this)));
    
    return router;
  }

  async all(req, res) {
    const objects = await models[singularize(this.constructor.name)].findAll();
    
    res.status(200).json(objects);
  };

  async find(req, res) {
    const id = getIdParam(req);
    const object = await models[singularize(this.constructor.name)].findByPk(id);
    
    if (object) {
      res.status(200).json(object);
    } else {
      res.status(404).send('404 - Not found');
    }
  };

  async create(req, res) {
    const object = await models[singularize(this.constructor.name)].create(req.body);

    if (object) {
      res.status(201).json(object);
    } else {
      // TODO - handle error from object creation above
      res.status(422).send('422 - Unprocessable entity');
    }
  };

  async update(req, res) {
    const id = getIdParam(req);
    
    await models[singularize(this.constructor.name)].update(req.body, { where: { id: id } });
    const object = await models[singularize(this.constructor.name)].findByPk(id);

    if (object) {
      res.status(200).json(object);
    } else {
      // TODO - handle error from object creation above
      res.status(422).send('422 - Unprocessable entity');
    }
  };

  async destroy(req, res) {
    const id = getIdParam(req);

    await models[singularize(this.constructor.name)].destroy({ where: { id: id } });

    res.status(200).end();
  };
}

module.exports = Api

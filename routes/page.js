// Common page methpds used by all classes
const Api = require('./api');
const { models } = require('../sequelize');
const humps = require('humps');
const { singularize } = require('sequelize/lib/utils');
const axios = require('axios');

class Page extends Api {
  constructor(router) {
    super(router);
    this.baseUrl = "http://localhost:3000";
    this.resourceName = humps.decamelize(this.constructor.name);
    this.initPageRoutes(router);
  }

  initPageRoutes(router) {
    // Creates routes for all common RESTful page methods
    router.get(`/${this.resourceName}`, this.index.bind(this));
    router.get(`/${this.resourceName}/new`, this.new.bind(this));
    router.get(`/${this.resourceName}/:id`, this.show.bind(this));
    router.get(`/${this.resourceName}/:id/edit`, this.edit.bind(this));
    // Creates routes for all common RESTful action methods
    router.post(`/${this.resourceName}`, this.createAction.bind(this));
    router.put(`/${this.resourceName}/:id`, this.updateAction.bind(this));
    router.delete(`/${this.resourceName}/:id`, this.destroyAction.bind(this));

    return router;
  }

  // Common pages
  index(req, res, customObject = {}) {
    this.get(this.allApiUrl(), (success) => {
      res.render(
        `${this.constructor.name}/index`,
        Object.assign({
          [humps.camelize(this.constructor.name)]: success.data,
          user: req.session.user,
          urls: {
            new: this.newPageUrl()
          }
        }, req.session.flash, customObject)
      );
      req.session.flash = {};
    }, (error) => {
      console.error(error);
    });
  }
  
  show(req, res, customObject = {}) {
    this.get(this.findApiUrl(req.params.id), (success) => {
      res.render(
        `${this.constructor.name}/show`,
        Object.assign({
          [humps.camelize(singularize(this.constructor.name))]: success.data,
          user: req.session.user,
          urls: {
            edit: this.editPageUrl(req.params.id),
            delete: this.destroyPageUrl(req.params.id)
          }
        }, req.session.flash, customObject)
      );
      req.session.flash = {};
    }, (error) => {
      console.error(error);
    });
  }

  new(req, res, customObject = {}) {
    res.render(
      `${this.constructor.name}/new`,
      Object.assign({
        user: req.session.user,
        urls: {
          index: this.indexPageUrl(),
          create: this.createPageUrl()
        }
      }, req.session.flash, customObject)
    );
    req.session.flash = {};
  }

  edit(req, res, customObject = {}) {
    this.get(this.findApiUrl(req.params.id), (success) => {
      res.render(
        `${this.constructor.name}/edit`,
        Object.assign({
          [humps.camelize(singularize(this.constructor.name))]: success.data,
          user: req.session.user,
          urls: {
            show: this.showPageUrl(req.params.id),
            update: this.updatePageUrl(req.params.id),
            delete: this.destroyPageUrl(req.params.id)
          }
        }, req.session.flash, customObject)
      );
      req.session.flash = {};
    }, (error) => {
      console.error(error);
    });
  }

  // Common actions
  /* Since we MUST consume the API, we route the following form actions through here
     and make the API calls here, then redirect to the destination action */
  createAction(req, res) {
    this.post(this.createApiUrl(), req.body[humps.camelize(singularize(this.constructor.name))], (success) => {
      res.redirect(this.showPageUrl(success.data.id));
    }, (error) => {
      console.error(error);
    });
  }

  updateAction(req, res) {
    this.put(this.updateApiUrl(req.params.id), req.body[humps.camelize(singularize(this.constructor.name))], (success) => {
      res.redirect(this.showPageUrl(success.data.id));
    }, (error) => {
      console.error(error);
    });
  }

  destroyAction(req, res) {
    this.delete(this.destroyApiUrl(req.params.id), (success) => {
      console.log("THIS PAGE: ", this.indexPageUrl())
      res.redirect(this.indexPageUrl());
    }, (error) => {
      console.error(error);
    });
  }

  // Method verbs
  get(url, success, error) {
    axios.get(url).then(function (response) {
      success(response);
    }).catch(function (response) {
      error(response);
    });
  }

  put(url, data, success, error) {
    axios.put(url, data).then(function (response) {
      success(response);
    }).catch(function (response) {
      error(response);
    });
  }

  post(url, data, success, error) {
    axios.post(url, data).then(function (response) {
      success(response);
    }).catch(function (response) {
      error(response);
    });
  }

  delete(url, success, error) {
    axios.delete(url).then(function (response) {
      success(response);
    }).catch(function (response) {
      error(response);
    });
  }

  // Page URLs
  // Method: GET
  indexPageUrl() {
    return `${this.baseUrl}/${this.resourceName}`;
  }
  // Method: GET
  showPageUrl(id) {
    return `${this.baseUrl}/${this.resourceName}/${id}`;
  }
  // Method: GET
  newPageUrl() {
    return `${this.baseUrl}/${this.resourceName}/new`;
  }
  // Method: GET
  editPageUrl(id) {
    return `${this.baseUrl}/${this.resourceName}/${id}/edit`;
  }
  // Method: POST
  createPageUrl(id) {
    return `${this.baseUrl}/${this.resourceName}`;
  }
  // Method: PUT
  updatePageUrl(id) {
    return `${this.showPageUrl(id)}?_method=PUT`;
  }
  // Method: DELETE
  destroyPageUrl(id) {
    return `${this.showPageUrl(id)}?_method=DELETE`;
  }

  // API URLs
  // Method: GET
  allApiUrl() {
    return `${this.baseUrl}/api/${this.resourceName}`;
  }
  // Method: GET
  findApiUrl(id) {
    return `${this.baseUrl}/api/${this.resourceName}/${id}`;
  }
  // Method: POST
  createApiUrl() {
    return `${this.baseUrl}/api/${this.resourceName}`;
  }
  // Method: PUT
  updateApiUrl(id) {
    return `${this.baseUrl}/api/${this.resourceName}/${id}`;
  }
  // Method: DELETE
  destroyApiUrl(id) {
    return `${this.baseUrl}/api/${this.resourceName}/${id}`;
  }
}

module.exports = Page;
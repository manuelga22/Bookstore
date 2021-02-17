// Common page methpds used by all classes
const Api = require('./api');
const { models } = require('../sequelize');
const humps = require('humps');
const { singularize } = require('sequelize/lib/utils');
const axios = require('axios');

class Page extends Api {
  constructor() {
    super();
    this.baseUrl = "http://localhost:3000";
    this.resourceName = humps.decamelize(this.constructor.name);
  }

  // Common pages
  index(req, res) {
    this.get(this.allApiUrl(), (success) => {
      res.render(
        `${this.constructor.name}/index`,
        {
          [humps.camelize(this.constructor.name)]: success.data,
          urls: {
            new: this.newPageUrl()
          }
        }
      );
    }, (error) => {
      console.error(error);
    });
  }
  
  show(req, res) {
    this.get(this.findApiUrl(req.params.id), (success) => {
      res.render(
        `${this.constructor.name}/show`,
        {
          [humps.camelize(singularize(this.constructor.name))]: success.data,
          urls: {
            edit: this.editPageUrl(req.params.id),
            delete: this.destroyPageUrl(req.params.id)
          }
        }
      );
    }, (error) => {
      console.error(error);
    });
  }

  new(req, res) {
    res.render(
      `${this.constructor.name}/new`,
      {
        urls: {
          index: this.indexPageUrl(),
          create: this.createPageUrl()
        }
      }
    );
  }

  edit(req, res) {
    this.get(this.findApiUrl(req.params.id), (success) => {
      res.render(
        `${this.constructor.name}/edit`,
        {
          [humps.camelize(singularize(this.constructor.name))]: success.data,
          urls: {
            update: this.updatePageUrl(req.params.id),
            delete: this.destroyPageUrl(req.params.id)
          }
        }
      );
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

module.exports = Page
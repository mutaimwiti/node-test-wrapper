var supertest = require('supertest');
var appDef = require('../../src/app');

var app = {
  /**
   * @private
   */
  client: supertest(appDef),

  /**
   * This method contains pre-request logic. It is executed by all http
   * wrapper methods i.e. get, post, ... , to alter the request
   * object. It's main use is to set any headers that may be
   * required.
   *
   * @param request
   * @returns {*}
   * @private
   */
  preRequest: function(request) {
    // add pre-request logic - alter request object
    return request;
  },

  // http wrapper methods
  // get(), post(), put(), patch(), delete()
  // you can add more methods offered by supertest

  get: function(url) {
    var req = app.client.get(url);

    return app.preRequest(req);
  },

  post: function(url) {
    var req = app.client.post(url);

    return app.preRequest(req);
  },

  put: function(url) {
    var req = app.client.put(url);

    return app.preRequest(req);
  },

  patch: function(url) {
    var req = app.client.patch(url);

    return app.preRequest(req);
  },

  delete: function(url) {
    var req = app.client.delete(url);

    return app.preRequest(req);
  }
};

module.exports = app;

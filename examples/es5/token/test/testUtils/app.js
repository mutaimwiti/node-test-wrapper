var supertest = require('supertest');
var appDef = require('../../src/app');
var utils = require('../../src/utils');
var createUser = require('./factories/users').createUser;

var generateAuthToken = utils.generateAuthToken;

var app = {
  /**
   * @private
   */
  client: supertest(appDef),

  /**
   * @private
   */
  token: null,

  /**
   * When this method is called it generates an auth token based on the details of
   * the user that is supplied. On a role-based auth system you might consider
   * having an extra optional argument to specify the role or permissions of
   * the user. This will allow you to assign the user the required
   * permission(s).
   *
   * @param user
   */
  login: function(user) {
    // add logic to generate user authentication token here ...
    // replace this with the actual implementation
    // your persistence system is most likely asynchronous - use a
    // callback or return a promise to handle this

    return new Promise(function(resolve) {
      generateAuthToken(user, function(err, token) {
        app.token = token;
        resolve(user);
      });
    });
  },

  /**
   * When this method is called it generates an auth token based on the details of
   * a randomly generated user. On a role-based auth system you might consider
   * having an optional argument to specify the role or permissions of the
   * user. This will allow you to assign the random user the required
   * permission(s).
   */
  loginRandom: function() {
    // create a random user - entirely up to your persistence system
    // add logic to generate user authentication token here ...
    // replace this with the actual implementation
    // your persistence system is most likely asynchronous - use a
    // callback or return a promise to handle this

    // in this example we randomly select one of our mocked users
    return new Promise(function(resolve) {
      createUser().then(function(user) {
        var userData = {
          username: user.username,
          password: user.password
        };

        generateAuthToken(userData, function(err, token) {
          app.token = token;
          resolve(user);
        });
      });
    });
  },

  /**
   * When this method is called it clears authentication data on the wrapper.
   * This means that calls to http wrapper methods generate request objects
   * that don't have the authentication header.
   */
  logout: function() {
    // remove authentication token
    app.token = null;
  },

  /**
   * This method contains pre-request logic. It is executed by all http
   * wrapper methods i.e. get, post, ... , to alter the request
   * object. It's main use is to set the authentication header.
   *
   * @param request
   * @returns {*}
   * @private
   */
  preRequest: function(request) {
    // add pre-request logic
    // set the authentication header
    // set whatever header your system uses for authentication
    return app.token ? request.set('authorization', app.token) : request;
  },

  // http wrapper methods
  // get(), post(), put(), patch(), delete()
  // you can add more methods offered by superagent

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

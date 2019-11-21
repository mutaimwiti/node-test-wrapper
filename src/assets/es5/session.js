var supertest = require('supertest');
var appDef = require('../path/to/your/app');

var app = {
  /**
   * @private
   */
  client: supertest(appDef),

  /**
   * @private
   */
  cookie: null,

  /**
   * When this method is called it generates a session cookie based on the details of
   * the user that is supplied. This can be achieved by making a login request to the
   * app and obtaining the cookie from the response headers. On a role-based auth
   * system you might consider having an extra optional argument to specify the
   * role or permissions of the user. This will allow you to assign the random
   * user the required permission(s).
   *
   * @param user
   */
  login: function(user) {
    // add logic to generate auth cookie here - ideally this will involve invoking
    // the login endpoint and extracting "set-cookie" from the response headers
    // replace this with the actual implementation
    // your persistence system is most likely asynchronous - use a
    // callback or return a promise to handle this
    app.cookie = 'generated-cookie';
  },

  /**
   * When this method is called it generates a session cookie based on the details of
   * the random user. This can be achieved by making a login request to the app and
   * obtaining the cookie from the response headers. On a role-based auth system
   * you might consider having an optional argument to specify the role or
   * permissions of the user. This will allow you to assign the random
   * user the required permission(s).
   */
  loginRandom: function() {
    // create a random user - entirely up to your persistence system
    // alternatively randomly select an existing user
    // add logic to generate auth cookie here - ideally this will involve invoking
    // the login endpoint and extracting "set-cookie" from the response headers
    // replace this with the actual implementation
    // your persistence system is most likely asynchronous - use a
    // callback or return a promise to handle this
    app.cookie = 'generated-cookie';
  },

  /**
   * When this method is called it clears authentication data on the wrapper.
   * This means that calls to http wrapper methods generate request objects
   * that don't have the authentication header.
   */
  logout: function() {
    // remove authentication cookie
    app.cookie = null;
  },

  /**
   * This method contains pre-request logic. It is executed by all http
   * wrapper methods i.e. get, post, ... , to alter the request object.
   * It's main use is to set the authentication header.
   *
   * @param request
   * @returns {*}
   * @private
   */
  preRequest: function(request) {
    // add pre-request logic
    // set the authorization header
    return app.cookie ? request.set('cookie', app.cookie) : request;
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

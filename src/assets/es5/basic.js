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
  credentials: null,

  /**
   * When this method is called it generates authentication credentials based on
   * the details of the user that is supplied. On a role-based auth system you
   * might consider having an extra optional argument to specify the role or
   * permissions of the user. This will allow you to assign the user the
   * required permission(s).
   *
   * @param user
   */
  login: function(user) {
    // add logic to generate user authentication credentials here ...
    // replace the username and password with the actual values
    // your persistence system is most likely asynchronous - use a
    // callback or return a promise to handle this
    app.credentials = {
      username: 'username',
      password: 'password'
    };
  },

  /**
   * When this method is called it generates authentication credentials for a
   * randomly generated user. On a role-based auth system you might consider
   * having an optional argument to specify the role or permissions of the
   * user. This will allow you to assign the random user the required
   * permission(s).
   */
  loginRandom: function() {
    // create a random user - entirely up to your persistence system
    // alternatively randomly select an existing user
    // add logic to generate user authentication credentials here ..
    // replace the username and password with the actual values
    // your persistence system is most likely asynchronous - use a
    // callback or return a promise to handle this
    app.credentials = {
      username: 'username',
      password: 'password'
    };

    return null; // return the logged in user here - optional
  },

  /**
   * When this method is called it clears authentication credentials on the wrapper.
   * This means that calls to http wrapper methods generate request objects that
   * don't have the authentication header.
   */
  logout: function() {
    // remove authentication credentials
    app.credentials = null;
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
    return app.credentials
      ? request.auth(app.credentials.username, app.credentials.password)
      : request;
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

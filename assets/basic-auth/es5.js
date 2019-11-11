const supertest = require('supertest');
const appDef = require('../path/to/your/app');

const app = {
  /**
   * @private
   */
  request: supertest(appDef),

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
  login(user) {
    // add logic to generate user authentication credentials here ...
    // replace the username and password with the actual values
    // your persistence system is most likely asynchronous - use a
    // callback or return a promise to handle this
    this.credentials = {
      username: 'username',
      password: 'password',
    };
  },

  /**
   * When this method is called it generates authentication credentials for a
   * randomly generated user. On a role-based auth system you might consider
   * having an optional argument to specify the role or permissions of the
   * user. This will allow you to assign the random user the required
   * permission(s).
   */
  loginRandom() {
    // create a random user - entirely up to your persistence system
    // add logic to generate user authentication credentials here ..
    // replace the username and password with the actual values
    // your persistence system is most likely asynchronous - use a
    // callback or return a promise to handle this
    this.credentials = {
      username: 'username',
      password: 'password',
    };
  },

  /**
   * When this method is called it clears authentication credentials on the wrapper.
   * This means that calls to http wrapper methods generate request objects that
   * don't have the authentication header.
   */
  logout() {
    // remove authentication credentials
    this.credentials = null;
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
  preRequest(request) {
    // add pre-request logic
    // set the authentication header
    return this.credentials
      ? request.auth(this.credentials.username, this.credentials.password)
      : request;
  },

  // http wrapper methods
  // get(), post(), put(), patch(), delete()
  // you can add more methods offered by supertest

  get(url) {
    const req = this.request.get(url);

    return this.preRequest(req);
  },

  post(url) {
    const req = this.request.post(url);

    return this.preRequest(req);
  },

  put(url) {
    const req = this.request.put(url);

    return this.preRequest(req);
  },

  patch(url) {
    const req = this.request.patch(url);

    return this.preRequest(req);
  },

  delete(url) {
    const req = this.request.delete(url);

    return this.preRequest(req);
  },
};

module.exports = app;

const supertest = require('supertest');
const appDef = require('../../app');

const app = {
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
  preRequest(request) {
    // add pre-request logic - alter request object
    return request;
  },

  // http wrapper methods
  // get(), post(), put(), patch(), delete()
  // you can add more methods offered by supertest

  get(url) {
    const req = this.client.get(url);

    return this.preRequest(req);
  },

  post(url) {
    const req = this.client.post(url);

    return this.preRequest(req);
  },

  put(url) {
    const req = this.client.put(url);

    return this.preRequest(req);
  },

  patch(url) {
    const req = this.client.patch(url);

    return this.preRequest(req);
  },

  delete(url) {
    const req = this.client.delete(url);

    return this.preRequest(req);
  },
};

module.exports = app;

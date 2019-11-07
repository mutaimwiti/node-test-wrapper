import supertest from 'supertest';
import appDef from '../path/to/your/app';

class app {
  /**
   * @private
   */
  static request = supertest(appDef);

  /**
   * This method contains pre-request logic. It is executed by all http
   * wrapper methods i.e. get, post, ... , to alter the request object.
   * It's main use is to set any headers that may be required.
   *
   * @param request
   * @returns {*}
   * @private
   */
  static preRequest(request) {
    // add pre-request logic - alter request object
    return request;
  }

  // http wrapper methods
  // get(), post(), put(), patch(), delete()
  // you can add more methods offered by supertest

  static get(url) {
    const req = this.request.get(url);

    return this.preRequest(req);
  }

  static post(url) {
    const req = this.request.post(url);

    return this.preRequest(req);
  }

  static put(url) {
    const req = this.request.put(url);

    return this.preRequest(req);
  }

  static patch(url) {
    const req = this.request.patch(url);

    return this.preRequest(req);
  }

  static delete(url) {
    const req = this.request.delete(url);

    return this.preRequest(req);
  }
}

export default app;

import supertest from 'supertest';
import appDef from '../path/to/your/app';

class App {
  constructor() {
    /** @private */
    this.client = supertest(appDef);
    /** @private */
    this.cookie = null;
  }

  /**
   * When this method is called it generates a session cookie based on the details of
   * the random user. This can be achieved by making a login request to the app and
   * obtaining the cookie from the response headers. On a role-based auth system
   * you might consider having an extra optional argument to specify the role or
   * permissions of the user. This will allow you to assign the random user the
   * required permission(s).
   *
   * @param user
   * @returns {Promise<void>}
   */
  async login(user) {
    // add logic to generate auth cookie here - ideally this will involve invoking
    // the login endpoint and extracting "set-cookie" from the response headers
    // replace this with the actual implementation
    this.cookie = 'generated-cookie';
  }

  /**
   * When this method is called it generates a session cookie based on the details
   * of the random user. On a role-based auth system you might consider having an
   * optional argument to specify the role or permissions of the user. This will
   * allow you to assign the random user the required permission(s).
   *
   * @returns {Promise<void>}
   */
  async loginRandom() {
    // create a random user - entirely up to your persistence system
    // add logic to generate auth cookie here - ideally this will involve invoking
    // the login endpoint and extracting "set-cookie" from the response headers
    // replace this with the actual implementation
    this.cookie = 'generated-cookie';
  }

  /**
   * When this method is called it clears authentication data on the wrapper.
   * This means that calls to http wrapper methods generate request objects
   * that don't have the authentication header.
   */
  logout() {
    // remove authentication cookie
    this.cookie = null;
  }

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
    // set the authorization header
    return this.cookie ? request.set('cookie', this.cookie) : request;
  }

  // http wrapper methods
  // get(), post(), put(), patch(), delete()
  // you can add more methods offered by supertest

  get(url) {
    const req = this.client.get(url);

    return this.preRequest(req);
  }

  post(url) {
    const req = this.client.post(url);

    return this.preRequest(req);
  }

  put(url) {
    const req = this.client.put(url);

    return this.preRequest(req);
  }

  patch(url) {
    const req = this.client.patch(url);

    return this.preRequest(req);
  }

  delete(url) {
    const req = this.client.delete(url);

    return this.preRequest(req);
  }
}

export default new App();

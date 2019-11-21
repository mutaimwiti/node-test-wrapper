import supertest from 'supertest';
import appDef from '../path/to/your/app';

class App {
  constructor() {
    /** @private */
    this.client = supertest(appDef);
    /** @private */
    this.token = null;
  }

  /**
   * When this method is called it generates an auth token based on the details of
   * the user that is supplied. On a role-based auth system you might consider
   * having an extra optional argument to specify the role or permissions of
   * the user. This will allow you to assign the user the required
   * permission(s).
   *
   * @param user
   * @returns {Promise<void>}
   */
  async login(user) {
    // add logic to generate user authentication details here ...
    // replace this with the actual implementation
    this.token = 'generated-auth-token';
  }

  /**
   * When this method is called it generates an auth token based on the details of
   * a randomly generated user. On a role-based auth system you might consider
   * having an optional argument to specify the role or permissions of the
   * user. This will allow you to assign the random user the required
   * permission(s).
   *
   * @returns {Promise<void>}
   */
  async loginRandom() {
    // create a random user - entirely up to your persistence system
    // alternatively randomly select an existing user
    // add logic to generate user authentication token here ...
    // replace this with the actual implementation
    this.token = 'generated-auth-token';

    return null; // return the logged in user here - optional
  }

  /**
   * When this method is called it clears authentication data on the wrapper.
   * This means that calls to http wrapper methods generate request objects
   * that don't have the authentication header.
   */
  logout() {
    // remove authentication token
    this.token = null;
  }

  /**
   * This method contains pre-request logic. It is executed by all http
   * wrapper methods i.e. get, post, ... , to alter the request object.
   * It's main use is to set the authentication header.
   *
   * @param request
   * @returns {*}
   * @private
   */
  preRequest(request) {
    // add pre-request logic
    // set the authentication header
    // set whatever header your system uses for authentication
    return this.token ? request.set('authorization', this.token) : request;
  }

  // http wrapper methods
  // get(), post(), put(), patch(), delete()
  // you can add more methods offered by superagent

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

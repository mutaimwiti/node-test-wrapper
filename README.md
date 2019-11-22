# App wrapper

App wrapper is elegant and scalable solution for HTTP testing in Node/Express. It works by creating a single object
that encapsulates all the logic needed to make HTTP assertions on a Node app. This solves the problem of other
desired behaviors like authentication.

### Quick start

- Install app-wrapper npm package globally

        npm install app-wrapper -g

  or

        yarn global add app-wrapper

- On your project folder run app wrapper CLI
    
   app-wrapper

- Select the javascript version of the wrapper to be generated

  ![Alt text](assets/select-js-version.png?raw=true)

- Select the type of authentication your application uses

  ![Alt text](assets/select-auth-type.png?raw=true)

- Specify the path for the generated wrapper

  ![Alt text](assets/specify-wrapper-path.png?raw=true)

  The wrapper is generated and placed on the path you chose

  ![Alt text](assets/wrapper-generated.png?raw=true)

- Customize the generated wrapper to suit the specifics of your application
  - **../path/to/your/app**

    Update the import with the actual path to your app. For example `../../src/app`.

  - **login()**
    Based on the type of authentication your application uses, specify how the authentication parameter
    will be generated when this function is called with a user object.
  - **loginRandom()**

    Similar to `login()` but in this case the generated authentication parameter relies on a randomly
    generated or selected user.

  - **logout()**

    This simply specifies how the authentication parameter is reset/removed. The default logic should
    suffice.

  - **preRequest()**

    This function is triggered every time before the wrapper makes a request. The default logic adds
    the authentication parameter to the request object if it exists i.e. if `login()` or `loginRandom()`
    were previously called and `logout()` was not. For example, setting the authorization header in token-based
    authentication. More pre-request logic can be added but it is crucial that the default logic is retained or
    modified in such a way that it retains its primary purpose.

  - **HTTP methods**

    When making HTTP assertions these methods are the methods that should be triggered. Under the hood, they
    call the respective HTTP methods on the SuperAgent instance. This allows for pre-request logic (defined in
    preRequest()) to be triggered to add any desired behaviors. The most common HTTP methods are available out
    of the box but more can be added as and when the need arises.
- Use the wrapper on your tests

  - Import the wrapper on your test file
  - Make HTTP assertions via the wrapper
  - Where authentication is required invoke `login()`, `loginRandom()` or `logout()` based on the desired behavior
  - Add any other desired behaviors as functions on the wrapper. Invoke the function as and when any behavior
    is required.

### Examples

> The examples below may not make everything crystal clear. Go through [examples](examples) for more elaborate full
> application illustrations. On all the examples `test/utils/app.js` is the app wrapper.

#### Wrappers

##### ES5

```javascript 1.5
// test/utils/app.js

var supertest = require('supertest');
var appDef = require('../../src/app');

var User = require('../../src/models').User;
var generateAuthToken = require('../../src/utils').generateAuthToken;

var app = {
  client: supertest(appDef),

  token: null,

  login: function(user, done) {
    generateAuthToken(user, function(err, token) {
      app.token = token;
      return err ? done(err) : done(null);
    });
  },

  loginRandom: function(done) {
    // get a random user - random is just an arbitrary function to get one user
    var user = User.random();

    generateAuthToken(user, function(err, token) {
      app.token = token;
      return err ? done(err) : done(null, user);
    });
  },

  logout: function() {
    app.token = null;
  },

  preRequest: function(request) {
    return app.token ? request.set('authorization', app.token) : request;
  },

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
```

##### ES6

```javascript
// test/utils/app.js

import supertest from 'supertest';
import appDef from '../../src/app';

const { generateAuthToken } = require('../../src/utils');
const { User } = require('../../src/models');

class App {
  constructor() {
    this.client = supertest(appDef);
    this.token = null;
  }

  async login(user) {
    this.token = await generateAuthToken(user);
  }

  async loginRandom() {
    // get a random user - random is just an arbitrary function to get one user
    const user = User.random();

    this.token = await generateAuthToken(user);

    return user;
  }

  logout() {
    this.token = null;
  }

  preRequest(request) {
    return this.token ? request.set('authorization', this.token) : request;
  }

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
```

#### Tests

##### ES5

```javascript 1.5
// tests/article.spec.js

var app = require('./utils/app');

describe('Articles', function() {
  describe('GET', function() {
    it('should not allow unauthenticated users to list all articles', function(done) {
      app.get('/articles').expect(401, done);
    });

    it('should allow authenticated users to list all articles', function(done) {
      app.loginRandom();

      app.get('/articles').then(function(res) {
        expect(res.body.articles).toEqual('All articles');
        app.logout();
        done();
      });
    });
  });
});
```

##### ES6

```javascript
// tests/article.spec.js

import app from './utils/app';

describe('Articles', () => {
  describe('GET', () => {
    it('should not allow unauthenticated users to list all articles', async () => {
      const res = await app.get('/articles');

      expect(res.status).toBe(401);
    });

    it('should allow authenticated users to list all articles', async () => {
      await app.loginRandom();
      const { body } = await app.get('/articles');
      expect(body.articles).toEqual('All articles');
      app.logout();
    });
  });
});
```

### Licence

[MIT](https://mit-license.org/) © Mutai Mwiti |
[GitHub](https://github.com/mutaimwiti) |
[GitLab](https://gitlab.com/mutaimwiti)

_**DISCLAIMER:**_
_All opinions expressed in this repository are mine and do not reflect any company or organisation I'm involved with._

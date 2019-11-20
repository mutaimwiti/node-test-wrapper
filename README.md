# App wrapper
App wrapper is elegant and scalable solution for HTTP testing in Node/Express. It works by creating a single object 
that encapsulates all the logic needed to make HTTP assertions on a Node app. This solves the problem of 
other desired behaviors like authentication.

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

- The wrapper is generated and placed on the path you chose

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
        were previously called and `logout()` wasn't. For example, setting the authorization header in token-based 
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

#### ES5
```javascript
// tests/article.spec.js

const app = require('./utils/app');

describe('Articles', function() {
  describe('GET', function() {
    it('should not allow unauthenticated users to list all articles', function(done) {
      app.get('/articles').expect(401, done);
    });

    it('should allow authenticated users to list all articles', function(done) {
      app.loginRandom(function() {
        app.get('/articles').then(function({ body }) {
          expect(body.articles).toEqual('All articles');
          app.logout();
          done();
        });
      });
    });
  });
});
```

#### ES6
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

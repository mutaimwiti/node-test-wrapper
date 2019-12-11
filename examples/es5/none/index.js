var app = require('./src/app');
var connect = require('./src/db').connect;

connect(function() {
  app.listen(3000, function() {
    console.log('Listening on http://localhost:3000');
  });
});

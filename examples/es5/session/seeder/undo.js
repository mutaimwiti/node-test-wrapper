var models = require('../src/models');
var db = require('../src/db');

var User = models.User;
var Report = models.Report;
var Article = models.Article;

var connect = db.connect;
var disconnect = db.disconnect;

function undo() {
  console.log('=============== Clearing database ===============');

  var deletes = Promise.all([
    User.deleteMany(),
    Article.deleteMany(),
    Report.deleteMany()
  ]);

  deletes.then(function() {
    console.log('============= Cleared successfully ==============');
    disconnect();
    process.exit(0);
  });
}

connect().then(function() {
  return undo();
});

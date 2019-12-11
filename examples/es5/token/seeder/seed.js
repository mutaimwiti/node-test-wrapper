var models = require('../src/models');
var mockData = require('./mockData');
var db = require('../src/db');

var User = models.User;
var Report = models.Report;
var Article = models.Article;

var connect = db.connect;
var disconnect = db.disconnect;

var mockUsers = mockData.mockUsers;
var mockReports = mockData.mockReports;
var mockArticles = mockData.mockArticles;

function seed() {
  console.log('=============== Clearing database ===============');

  var deletes = Promise.all([Report.deleteMany(), Article.deleteMany()]);

  return deletes.then(function() {
    console.log('============= Cleared successfully ==============');
    console.log('================ Seeding database ===============');

    var inserts = Promise.all([
      User.insertMany(mockUsers),
      Report.insertMany(mockReports),
      Article.insertMany(mockArticles)
    ]);

    inserts.then(function() {
      console.log('============== Seeded successfully ==============');
      disconnect().then(function() {
        process.exit(0);
      });
    });
  });
}

connect().then(function() {
  return seed();
});

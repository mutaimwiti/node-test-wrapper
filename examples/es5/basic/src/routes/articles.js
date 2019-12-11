var Router = require('express').Router;
var Article = require('../models').Article;

var router = Router();

router.get('/', function(req, res) {
  Article.find({}, function(err, articles) {
    return res.json({ articles: articles });
  });
});

router.get('/:id', function(req, res) {
  var id = req.params.id;

  Article.findOne({ _id: id }, function(err, article) {
    return res.json({ article: article });
  });
});

router.post('/', function(req, res) {
  var data = req.body;

  Article.create(data, function(err, article) {
    return res
      .status(201)
      .json({ article: article, message: 'Created article successfully' });
  });
});

router.put('/:id', function(req, res) {
  Article.findOne({ _id: req.params.id }, function(err, article) {
    var articleToUpdate = article;

    articleToUpdate.title = req.body.title;
    articleToUpdate.body = req.body.body;

    articleToUpdate.save(function(error, updated) {
      return res.json({
        article: updated,
        message: 'Updated article successfully'
      });
    });
  });
});

router.delete('/:id', function(req, res) {
  Article.findOneAndDelete({ _id: req.params.id }, function() {
    return res.json({ message: 'Article deleted successfully' });
  });
});

module.exports = router;

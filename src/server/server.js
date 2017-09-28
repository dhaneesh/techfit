var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var cron = require('node-cron');
var bodyParser = require('body-parser');
var {mongoose} = require('./db/mongoose');
var {Posts, ScrapePosts} = require('./models/posts');
var {logger} = require('./lib/services/loggerService');
var app = express();

const port = process.env.PORT || 3000;
app.use(bodyParser.json());

ScrapePosts.find().exec(function (err, newPosts) {
  var count = 0;
  if (err) {
    logger.error('Error in retrieving existing posts');
  } else {
    newPosts.forEach(function(newPost) {
      Posts.update(
          {title: newPost.title, url: newPost.url},
          {
              "title": newPost.title,
              "category": newPost.tag,
              "url": newPost.url,
              "publishdate": newPost.publishdate,
              "description": newPost.description,
          },
          { upsert: true, multi: true },
          function(err, numAffected) {
            count++;
            if(err) {
              logger.info('Already existing posts :-', newPost);
            } else {
              logger.error('successfully inserted posts :-', newPost);
            }
          }
      );
    })
  }
});

app.get('/posts', (req, res) => {
  Posts.find().then((posts) => {
    res.send({posts});
  }, (e) => {
    res.status(400).send(e);
  })
});

app.get('/posts/:tag', (req, res) => {
  var tag = req.params.tag;
  Posts.find({ category: tag }).then((posts) => {
    res.send({posts});
  }, (e) => {
    res.status(400).send(e);
  })
});

app.get('/scrape', function(req, res) {
  url = 'https://www.smashingmagazine.com/category/coding/';
  request(url, function(error, response, html) {
    if(!error){
      var $ = cheerio.load(html);
      var parsedResults = [];
      $('article').each(function(i, element) {
        var post_link = $(this).children().first().children().attr('href');
        var title = $(this).children().first().children().children().text();
        publishdate = $(this).find('.rd').text();
        var description = $(this).children('p').text();
        var scrape_data = {
          title: title,
          tag: 'js',
          url: post_link,
          publishdate: publishdate,
          description: description
        }
        parsedResults.push(scrape_data);
      });
      console.log(parsedResults);
    }

    ScrapePosts.insertMany(parsedResults)
      .then(function(mongooseDocuments) {
         console.log('successfully inserted');
      })
      .catch(function(err) {
        console.log('insertion failed', err);
      });

    res.send('operation completed');
  })
})

// cron.schedule('1-5 * * * *', function(){
//   console.log('running every minute to 1 from 5');
// });


app.listen(port)
console.log(`Magic happens on port ${port}`);
exports = module.exports = app;

var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var cron = require('node-cron');
var bodyParser = require('body-parser');
var {mongoose} = require('./db/mongoose');
var {Posts, ScrapePosts} = require('./models/posts');
var app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());


ScrapePosts.find().exec(function (err, posts) {
    if (err) {
      console.log('error', err);
    } else {
      var promises = [];
      posts.forEach(function(post) {
        promise = Q(var query = {title: 'Exploring Animation'},
            update = { title: 'Test data' },
            options = { upsert: true, new: true, setDefaultsOnInsert: true };

            ScrapePosts.update(
                {title: 'Checking data', url: 'https://www.smashingmagazine.com/2017/09/animation-interaction-techniques-webgl/'},
                {
                    "title": "Checking data",
                    "category": "js",
                    "url": "https://www.smashingmagazine.com/2017/09/animation-interaction-techniques-webgl/",
                    "publishdate": "September 25th, 2017",
                    "description": "Two years ago, I decided to start a series of short WebGL experiments on Codepen. Earlier this year, I finally found the time to compile them all together on a single website named \"Moments of Happiness\". Since its incarnation, I’ve found ways to explore and learn different animation and interaction techniques, which I’ve implemented in these interactive toys.As you'll see, the gameplay is very different in each one, but all of the experiments share one principle: The behavior of each character responds programmatically to user input. No precalculated animation — every movement is defined at runtime. Breathing life into these characters with only a few lines of code was the main challenge."
                },
                { upsert: true},
                { multi: true },
                function(err, numAffected) {
                  console.log(numAffected);
                  if(err) {
                    console.log('err', err);
                  } else {
                    console.log('not errr');
                  }
                }
            );)
          .then(

            },
            function(err) {
             //handle error
        });
      });

      Q.all(promises)
      .then(function() {
          return res.jsonp(posts);
      });
    }
  });





var query = {title: 'Exploring Animation'},
    update = { title: 'Test data' },
    options = { upsert: true, new: true, setDefaultsOnInsert: true };

    ScrapePosts.update(
        {title: 'Checking data', url: 'https://www.smashingmagazine.com/2017/09/animation-interaction-techniques-webgl/'},
        {
            "title": "Checking data",
            "category": "js",
            "url": "https://www.smashingmagazine.com/2017/09/animation-interaction-techniques-webgl/",
            "publishdate": "September 25th, 2017",
            "description": "Two years ago, I decided to start a series of short WebGL experiments on Codepen. Earlier this year, I finally found the time to compile them all together on a single website named \"Moments of Happiness\". Since its incarnation, I’ve found ways to explore and learn different animation and interaction techniques, which I’ve implemented in these interactive toys.As you'll see, the gameplay is very different in each one, but all of the experiments share one principle: The behavior of each character responds programmatically to user input. No precalculated animation — every movement is defined at runtime. Breathing life into these characters with only a few lines of code was the main challenge."
        },
        { upsert: true},
        { multi: true },
        function(err, numAffected) {
          console.log(numAffected);
          if(err) {
            console.log('err', err);
          } else {
            console.log('not errr');
          }
        }
    );


// ScrapePosts.findOne({title: 'Exploring Animation'}, function(err, contact) {
//     if(!err) {
//       console.log('exits');
//         // if(!contact) {
//         //     contact = new ContactSchema();
//         //     contact.phone = request.phone;
//         // }
//         // contact.status = request.status;
//         // contact.save(function(err) {
//         //     if(!err) {
//         //         console.log("contact " + contact.phone + " created at " + contact.createdAt + " updated at " + contact.updatedAt);
//         //     }
//         //     else {
//         //         console.log("Error: could not save contact " + contact.phone);
//         //     }
//         // });
//     } else {
//       console.log('not exists');
//     }
// });





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

// app.get('/scrape', function(req, res) {
//   url = 'https://www.smashingmagazine.com/category/coding/';
//   request(url, function(error, response, html) {
//     if(!error){
//       var $ = cheerio.load(html);
//       var parsedResults = [];
//       $('article').each(function(i, element) {
//         var post_link = $(this).children().first().children().attr('href');
//         var title = $(this).children().first().children().children().text();
//         publishdate = $(this).find('.rd').text();
//         var description = $(this).children('p').text();
//         var scrape_data = {
//           title: title,
//           tag: 'js',
//           url: post_link,
//           publishdate: publishdate,
//           description: description
//         }
//         parsedResults.push(scrape_data);
//       });
//       console.log(parsedResults);
//     }
//
//     ScrapePosts.insertMany(parsedResults)
//       .then(function(mongooseDocuments) {
//          console.log('successfully inserted');
//       })
//       .catch(function(err) {
//         console.log('insertion failed', err);
//       });
//
//     // fs.writeFile('output.json', JSON.stringify(parsedResults, null, 4), function(err) {
//     //   console.log('File successfully written! - Check your project directory for the output.json file');
//     // })
//
//     res.send('operation completed');
//   })
// })

// cron.schedule('1-5 * * * *', function(){
//   console.log('running every minute to 1 from 5');
// });




app.listen(port)
console.log(`Magic happens on port ${port}`);
exports = module.exports = app;

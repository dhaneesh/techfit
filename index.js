var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();


app.get('/scrape', function(req, res){
  // Let's scrape Anchorman 2
  url = 'https://www.smashingmagazine.com/category/coding/';

  request(url, function(error, response, html) {

    if(!error){
      var $ = cheerio.load(html);
      var parsedResults = [];
      $('article').each(function(i, element) {
        var link = $(this).children().first().children().attr('href');
        var title = $(this).children().first().children().children().text();
        var description = $(this).children('p').text();
        var scrape_data = {
          title: title,
          link: link,
          description: description
        }
        parsedResults.push(scrape_data);
      });
      console.log(parsedResults);
    }
    
    fs.writeFile('output.json', JSON.stringify(parsedResults, null, 4), function(err) {
      console.log('File successfully written! - Check your project directory for the output.json file');
    })

    res.send('Check your console!')
  })
})

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;
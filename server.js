const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

const url = 'https://www.reddit.com/top/';

request(url, function(err, response, html) {
  if (!err) {
    let $ = cheerio.load(html);
    let allItems = $('#siteTable').children();
    let items = [];
    allItems.each(function(index) {
      let result = $('#siteTable').children().eq(index).children().eq(4).find('a.title').text();
      
      if (result !== "") {
        items.push(result);
      }
    });

    fs.writeFile('output.txt', JSON.stringify(items, null, 4), function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log('Data has been added to a file!');
      }
    });

     console.log(items);
  }
});

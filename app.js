/*
  Cid: A Server Side Image Bundler
*/
var express = require('express')
  , sys = require('util')
  , jsdom = require('jsdom');

var app = module.exports = express.createServer();

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

// Routes

app.get('/', function(req, res){
  
  var params = req.query
    , targetUrl = req.query.targetUrl
    , srcs = req.query.srcs
    , callback = req.query.callback
    , hashMap = {};
  
  inliner(targetUrl, function (html) {


    jsdom.env(html.toString(), ['http://code.jquery.com/jquery-1.5.min.js' ], function(errors, window) {
      var image = window.$("img");
      image.each(function(index, item) {
        var record = {};
        hashMap[window.$(item).attr('x-src')] = window.$(item).attr('src').replace(/text\/html/gi, 'image/jpeg');
        //hashMap.push(record);
        //console.log();
      });
  
      //hashMap = Array.prototype.slice.call(hashMap, 23);    
      
      var response  = callback + "(" + JSON.stringify(hashMap) + ");";    
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(response);

    });


  });
   
});

app.get('/bundle', function(req, res){
  
  var params = req.query
    , targetUrl = req.query.targetUrl
    , srcs = req.query.srcs
    , callback = req.query.callback
    , hashMap = {};
  
  inliner(targetUrl, function (html) {


    jsdom.env(html.toString(), ['http://code.jquery.com/jquery-1.5.min.js' ], function(errors, window) {
      var image = window.$("img");
      image.each(function(index, item) {
        var record = {};
        hashMap[window.$(item).attr('x-src')] = window.$(item).attr('src').replace(/text\/html/gi, 'image/jpeg');
        //hashMap.push(record);
        //console.log();
      });
  
      //hashMap = Array.prototype.slice.call(hashMap, 23);    
      
      var response  = callback + "(" + JSON.stringify(hashMap) + ");";    
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(response);

    });


  });
   
});
// Only listen on $ node app.js

if (!module.parent) {
  app.listen(3000);
  console.log("Express server listening on port %d", app.address().port);
}

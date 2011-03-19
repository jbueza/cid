

/*
  MOBIFIER: SERVER SIDE IMAGE BUNDLER!
*/

/**
 * Module dependencies.
 */

var express = require('express');

var inliner = require('./mobifier/lib/inliner');

var app = module.exports = express.createServer();

// Configuration

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
  
  
  //JSONP request   http://www.mobify.me/api/imager-mobifier
    //params
      // rootElement - Scope jsdom image base64 encoder

    // returns
    
      /*
      
      [
          { '/Assets/image.gif': 'base64encoded string goes here'}
        , { '/Assets/image.gif': 'base64encoded string goes here'}
        , { '/Assets/image.gif': 'base64encoded string goes here'}
        , { '/Assets/image.gif': 'base64encoded string goes here'}
        , { '/Assets/image.gif': 'base64encoded string goes here'}
        , { '/Assets/image.gif': 'base64encoded string goes here'}
        , { '/Assets/image.gif': 'base64encoded string goes here'}
      ]
      */
      
      
  
  
  
  res.render('index', {
    title: 'Express'
  });
});

// Only listen on $ node app.js

if (!module.parent) {
  app.listen(3000);
  console.log("Express server listening on port %d", app.address().port);
}

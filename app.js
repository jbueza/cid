/*
  Cid: A Server Side Image Bundler
*/
var express = require('express')
  , sys = require('util')
  , cid = require('./lib/cid');
  
var app = module.exports = express.createServer();

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express['static'](__dirname + '/public'));
});

// Routes

app.get('/', function(req, res){
  res.render('index', {
    title: 'cid'
  }); 
});

app.get('/bundle', function(req, res){
  var params = req.query, callback = req.query.callback;
  cid.fetch(params, function(response) {
    var response = callback + "(" + JSON.stringify(response) + ");"; 
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(response);
  });
   
});

if (!module.parent) {
  app.listen(3000);
  console.log("Running cid on %d", app.address().port);
}

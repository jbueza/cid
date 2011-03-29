var URL = require('url')
  , Buffer = require('buffer').Buffer
  , http = require('http');
exports.version = '0.0.1';
var cid = {};
cid.fetch = function(params, callback) {
  var root = params.root
    , map = {}
    , execute = 0
    , images = params.images.split(',');
  var complete = function(key, value) {
    execute++;
    map[key] = value;
  };
  
  if ( !images.length ) callback.call(this, { errors: ['Please pass `images` parameter.'] });
  if ( images.length > 100 ) {
    callback.call(this, { errors: ['Requesting too many images for now.'] });
  }
  
  
  images.forEach(function(img, i) {
    var oURL = URL.parse(root + '/' + img),
        client = http.createClient(80, oURL.hostname),
        request = client.request('GET', oURL.pathname, {'host': oURL.hostname});
    request.end();
    request.on('response', function (response) {
      var type = response.headers["content-type"], prefix = "data:" + type + ";base64,", body = "";
      response.setEncoding('binary');
      response.on('end', function () {
        var base64 = new Buffer(body, 'binary').toString('base64'),
            data = prefix + base64;
            console.error(oURL.href + ': ' + data.length);
            complete(img, data);
      });
      response.on('data', function (chunk) {
        if (response.statusCode == 200) body += chunk;
      });
    });    
  });

  var interval = setInterval(function() {
    if ( execute == images.length ) {
      clearInterval(interval);
      callback.call(this, map);
    }
  }, 10);
};

module.exports = cid;
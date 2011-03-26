var URL = require('url'),
    Buffer = require('buffer').Buffer;
    
/*!
 * cid
 * Copyright(c) 2011 jbueza <jbueza@gmail.com>
 * MIT Licensed
 */
exports.version = '0.0.1';




cid = {};

cid.fetch = function(url, callback) {
  var target = URL.parse(url),
      http = require('http'),
      client = http.createClient(80, target.hostname),
      request = client.request('GET', target.pathname, {'host': target.hostname});

  request.end();
  request.on('response', function (response) {
    var type = response.headers["content-type"],
        prefix = "data:" + type + ";base64,",
        body = "";

    response.setEncoding('binary');
    response.on('end', function () {
      var base64 = new Buffer(body, 'binary').toString('base64'),
          data = prefix + base64;
      
      console.error('dataurl for ' + url + ': ' + data.length);
      
      callback(data);
    });
    response.on('data', function (chunk) {
      if (response.statusCode == 200) body += chunk;
    });
  });
};


module.exports = cid;
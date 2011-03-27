
/**
 * Module dependencies.
 */

var cid = require('cid')
  , should = require('should');

module.exports = {
  'test .version': function(){
    cid.version.should.match(/^\d+\.\d+\.\d+$/);
  }
};
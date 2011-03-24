
/**
 * Module dependencies.
 */

var mobifier = require('mobifier')
  , should = require('should');

module.exports = {
  'test .version': function(){
    mobifier.version.should.match(/^\d+\.\d+\.\d+$/);
  }
};
'use strict';

var helpers = module.exports = {};

var grunt = require('grunt');

helpers.read = function(src) {
  var result = grunt.util.normalizelf(grunt.file.read(src));
  if (result.slice(-1) === '\n') {
    result = result.slice(0, -1);
  }
  return result;
};

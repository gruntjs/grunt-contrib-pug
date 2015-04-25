'use strict';

var grunt = require('grunt');

var read = function(src) {
  return grunt.util.normalizelf(grunt.file.read(src));
};

exports.jade = {
  compile: function(test) {

    test.expect(4);

    var actual = read('tmp/jst/jade.js');
    var expected = read('test/expected/jst/jade.js');
    test.equal(expected, actual, 'should compile jade templates to JST template');

    actual = read('tmp/jst/jade2.js');
    expected = read('test/expected/jst/jade2.js');
    test.equal(expected, actual, 'should compile jade templates to JST template (multiple files support)');

    actual = read('tmp/jst/jadeInclude.js');
    expected = read('test/expected/jst/jadeInclude.js');
    test.equal(expected, actual, 'should compile jade templates to JST template with an include');

    actual = read('tmp/jst/jadeTemplate.js');
    expected = read('test/expected/jst/jadeTemplate.js');
    test.equal(expected, actual, 'should compile jade templates to JST template with grunt template support');

    test.done();
  }
};

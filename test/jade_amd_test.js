'use strict';

var grunt = require('grunt');

var read = function(src) {
  return grunt.util.normalizelf(grunt.file.read(src));
};

exports.jade = {
  compile: function(test) {

    test.expect(6);

    var actual = read('tmp/amd/jade.js');
    var expected = read('test/expected/amd/jade.js');
    test.equal(expected, actual, 'should compile jade templates to js');

    actual = read('tmp/amd/jade2.js');
    expected = read('test/expected/amd/jade2.js');
    test.equal(expected, actual, 'should compile jade templates to js (multiple files support)');

    actual = read('tmp/amd/jadeInclude.js');
    expected = read('test/expected/amd/jadeInclude.js');
    test.equal(expected, actual, 'should compile jade templates to js with an include');

    actual = read('tmp/amd/jadeTemplate.js');
    expected = read('test/expected/amd/jadeTemplate.js');
    test.equal(expected, actual, 'should compile jade templates to js with grunt template support');

    actual = read('tmp/amd/jadeDeps.js');
    expected = read('test/expected/amd/jadeDeps.js');
    test.equal(expected, actual, 'should compile jade templates to js with AMD dependencies');

    actual = read('tmp/amd/jade2Deps.js');
    expected = read('test/expected/amd/jade2Deps.js');
    test.equal(expected, actual, 'should compile jade templates to js with AMD dependencies');

    test.done();
  }
};

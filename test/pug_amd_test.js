'use strict';

var grunt = require('grunt');

var read = function(src) {
  return grunt.util.normalizelf(grunt.file.read(src));
};

exports.pug = {
  compile: function(test) {

    test.expect(4);

    var actual = read('tmp/amd/pug.js');
    var expected = read('test/expected/amd/pug.js');
    test.equal(expected, actual, 'should compile pug templates to js');

    actual = read('tmp/amd/pug2.js');
    expected = read('test/expected/amd/pug2.js');
    test.equal(expected, actual, 'should compile pug templates to js (multiple files support)');

    actual = read('tmp/amd/pugInclude.js');
    expected = read('test/expected/amd/pugInclude.js');
    test.equal(expected, actual, 'should compile pug templates to js with an include');

    actual = read('tmp/amd/pugTemplate.js');
    expected = read('test/expected/amd/pugTemplate.js');
    test.equal(expected, actual, 'should compile pug templates to js with grunt template support');

    test.done();
  }
};

'use strict';

var grunt = require('grunt');

var read = function(src) {
  return grunt.util.normalizelf(grunt.file.read(src));
};

exports.pug = {
  compile: function(test) {

    test.expect(4);

    var actual = read('tmp/jst/pug.js');
    var expected = read('test/expected/jst/pug.js');
    test.equal(expected, actual, 'should compile pug templates to JST template');

    actual = read('tmp/jst/pug2.js');
    expected = read('test/expected/jst/pug2.js');
    test.equal(expected, actual, 'should compile pug templates to JST template (multiple files support)');

    actual = read('tmp/jst/pugInclude.js');
    expected = read('test/expected/jst/pugInclude.js');
    test.equal(expected, actual, 'should compile pug templates to JST template with an include');

    actual = read('tmp/jst/pugTemplate.js');
    expected = read('test/expected/jst/pugTemplate.js');
    test.equal(expected, actual, 'should compile pug templates to JST template with grunt template support');

    test.done();
  }
};

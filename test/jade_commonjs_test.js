var grunt = require('grunt');

exports.jade = {
  compile: function(test) {
    'use strict';

    test.expect(4);

    var actual = grunt.file.read('tmp/commonjs/jade.js');
    var expected = grunt.file.read('test/expected/commonjs/jade.js');
    test.equal(expected, actual, 'should compile jade templates to js');

    actual = grunt.file.read('tmp/commonjs/jade2.js');
    expected = grunt.file.read('test/expected/commonjs/jade2.js');
    test.equal(expected, actual, 'should compile jade templates to js (multiple files support)');

    actual = grunt.file.read('tmp/commonjs/jadeInclude.js');
    expected = grunt.file.read('test/expected/commonjs/jadeInclude.js');
    test.equal(expected, actual, 'should compile jade templates to js with an include');

    actual = grunt.file.read('tmp/commonjs/jadeTemplate.js');
    expected = grunt.file.read('test/expected/commonjs/jadeTemplate.js');
    test.equal(expected, actual, 'should compile jade templates to js with grunt template support');

    test.done();
  }
};
var grunt = require('grunt');

exports.jade = {
  compile: function(test) {
    'use strict';

    test.expect(6);

    var actual = grunt.file.read('tmp/multiproc/jade.html');
    var expected = grunt.file.read('test/expected/jade.html');
    test.equal(expected, actual, 'should compile jade templates to html, with multiple processes');

    actual = grunt.file.read('tmp/multiproc/jade2.html');
    expected = grunt.file.read('test/expected/jade2.html');
    test.equal(expected, actual, 'should compile jade templates to html, with multiple processes (multiple files support)');

    actual = grunt.file.read('tmp/multiproc/jadeCombine.html');
    expected = grunt.file.read('test/expected/jadeCombine.html');
    test.equal(expected, actual, 'should compile jade templates to html, with multiple processes, if passed an array of files');

    actual = grunt.file.read('tmp/multiproc/jadeGlobbingCombine.html');
    expected = grunt.file.read('test/expected/jadeGlobbingCombine.html');
    test.equal(expected, actual, 'should compile jade templates to html, with multiple processes, if passed a globbing pattern');

    actual = grunt.file.read('tmp/multiproc/jadeInclude.html');
    expected = grunt.file.read('test/expected/jadeInclude.html');
    test.equal(expected, actual, 'should compile jade templates to html with an include, and with multiple processes');

    actual = grunt.file.read('tmp/multiproc/jadeTemplate.html');
    expected = grunt.file.read('test/expected/jadeTemplate.html');
    test.equal(expected, actual, 'should compile jade templates to html with grunt template support, and with multiple processes');

    test.done();
  }
};
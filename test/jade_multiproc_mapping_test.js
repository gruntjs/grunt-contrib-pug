var grunt = require('grunt');

exports.jade = {
  compile: function(test) {
    'use strict';

    test.expect(3);

    var actual = grunt.file.read('tmp/multiproc_mapping/jade.html');
    var expected = grunt.file.read('test/expected/multiproc_mapping/jade.html');
    test.equal(expected, actual, 'Should render from file mapping (non-globbing)');

    actual = grunt.file.read('tmp/multiproc_mapping/jadeGlobbing1.html');
    expected = grunt.file.read('test/expected/multiproc_mapping/jadeGlobbing1.html');
    test.equal(expected, actual, 'Should render from file mapping (globbing, 1 of 2)');

    actual = grunt.file.read('tmp/multiproc_mapping/jadeGlobbing2.html');
    expected = grunt.file.read('test/expected/multiproc_mapping/jadeGlobbing2.html');
    test.equal(expected, actual, 'Should render from file mapping (globbing, 2 of 2)');

    test.done();
  }
};
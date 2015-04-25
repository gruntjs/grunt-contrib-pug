'use strict';

var grunt = require('grunt');

var read = function(src) {
  return grunt.util.normalizelf(grunt.file.read(src));
};

exports.jade = {
  compile: function(test) {

    test.expect(9);

    var actual = read('tmp/jade.html');
    var expected = read('test/expected/jade.html');
    test.equal(expected, actual, 'should compile jade templates to html');

    actual = read('tmp/jade2.html');
    expected = read('test/expected/jade2.html');
    test.equal(expected, actual, 'should compile jade templates to html (multiple files support)');

    actual = read('tmp/jadeInclude.html');
    expected = read('test/expected/jadeInclude.html');
    test.equal(expected, actual, 'should compile jade templates to html with an include');

    actual = read('tmp/jadeTemplate.html');
    expected = read('test/expected/jadeTemplate.html');
    test.equal(expected, actual, 'should compile jade templates to html with grunt template support');

    actual = read('tmp/jadeDynamicData.html');
    expected = read('test/expected/jadeDynamicData.html');
    test.equal(expected, actual, 'should allow options.data to be a function');

    actual = read('tmp/inlineFilters.html');
    expected = read('test/expected/jadeFilters.html');
    test.equal(expected, actual, 'should compile jade with inline filters');

    actual = read('tmp/exportedFilters.html');
    expected = read('test/expected/jadeFilters.html');
    test.equal(expected, actual, 'should compile jade with exported filters');

    actual = read('tmp/jadeAdvancedFilters.html');
    expected = read('test/expected/jadeAdvancedFilters.html');
    test.equal(expected, actual, 'should compile jade with nested filters with access to locals');

    actual = read('tmp/jadeUsingmixin.html');
    expected = read('test/expected/jadeUsingmixin.html');
    test.equal(expected, actual, 'should compile jade with nested mixins');

    test.done();
  }
};

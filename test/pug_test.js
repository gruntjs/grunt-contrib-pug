'use strict';

var grunt = require('grunt');

var read = function(src) {
  return grunt.util.normalizelf(grunt.file.read(src));
};

exports.pug = {
  compile: function(test) {

    test.expect(10);

    var actual = read('tmp/pug.html');
    var expected = read('test/expected/pug.html');
    test.equal(expected, actual, 'should compile pug templates to html');

    actual = read('tmp/pug2.html');
    expected = read('test/expected/pug2.html');
    test.equal(expected, actual, 'should compile pug templates to html (multiple files support)');

    actual = read('tmp/pugInclude.html');
    expected = read('test/expected/pugInclude.html');
    test.equal(expected, actual, 'should compile pug templates to html with an include');

    actual = read('tmp/pugTemplate.html');
    expected = read('test/expected/pugTemplate.html');
    test.equal(expected, actual, 'should compile pug templates to html with grunt template support');

    actual = read('tmp/pugDynamicData.html');
    expected = read('test/expected/pugDynamicData.html');
    test.equal(expected, actual, 'should allow options.data to be a function');

    actual = read('tmp/inlineFilters.html');
    expected = read('test/expected/pugFilters.html');
    test.equal(expected, actual, 'should compile pug with inline filters');

    actual = read('tmp/exportedFilters.html');
    expected = read('test/expected/pugFilters.html');
    test.equal(expected, actual, 'should compile pug with exported filters');

    actual = read('tmp/pugAdvancedFilters.html');
    expected = read('test/expected/pugAdvancedFilters.html');
    test.equal(expected, actual, 'should compile pug with nested filters with access to locals');

    actual = read('tmp/pugUsingmixin.html');
    expected = read('test/expected/pugUsingmixin.html');
    test.equal(expected, actual, 'should compile pug with nested mixins');

    actual = read('tmp/pugCodeBlock.html');
    expected = read('test/expected/pugCodeBlock.html');
    test.equal(expected, actual, 'should compile pug with codeblock');

    test.done();
  }
};

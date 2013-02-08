var grunt = require('grunt');
var requirejs = require('requirejs');

exports.jade = {
  compile: function(test) {
    'use strict';

    test.expect(4);

    var data = grunt.config.get("jade").compile_amd.options.data;
    var fn = requirejs("tmp/amd/jade.js");
    var actual = fn(data);
    var expected = grunt.file.read('test/expected/jade.html');

    test.equal(expected, actual, 'should compile jade templates to html');

    fn = requirejs("tmp/amd/jade2.js");
    actual = fn(data);
    expected = grunt.file.read('test/expected/jade2.html');
    test.equal(expected, actual, 'should compile jade templates to html (multiple files support)');

    fn = requirejs("tmp/amd/jadeInclude.js");
    actual = fn(data);
    expected = grunt.file.read('test/expected/jadeInclude.html');
    test.equal(expected, actual, 'should compile jade templates to html with an include');

    fn = requirejs("tmp/amd/jadeTemplate.js");
    actual = fn(data);
    expected = grunt.file.read('test/expected/jadeTemplate.html');
    test.equal(expected, actual, 'should compile jade templates to html with grunt template support');

    test.done();
  }
};
var grunt = require('grunt');

exports.jade = {
  compile: function(test) {
    'use strict';

    test.expect(4);

    global.jade = require("jade").runtime;

    var data = grunt.config.get("jade").compile_jst.options.data;
    var fn = require("./../tmp/jst/jade").JST["jade"];
    var actual = fn(data);
    var expected = grunt.file.read('test/expected/jade.html');

    test.equal(expected, actual, 'should compile jade templates to html');

    fn = require("./../tmp/jst/jade2").JST["jade2"];
    actual = fn(data);
    expected = grunt.file.read('test/expected/jade2.html');
    test.equal(expected, actual, 'should compile jade templates to html (multiple files support)');

    fn = require("./../tmp/jst/jadeInclude").JST["jadeInclude"];
    actual = fn(data);
    expected = grunt.file.read('test/expected/jadeInclude.html');
    test.equal(expected, actual, 'should compile jade templates to html with an include');

    fn = require("./../tmp/jst/jadeTemplate").JST["jadeTemplate"];
    actual = fn(data);
    expected = grunt.file.read('test/expected/jadeTemplate.html');
    test.equal(expected, actual, 'should compile jade templates to html with grunt template support');

    test.done();
  }
};
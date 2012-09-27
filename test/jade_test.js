var grunt = require('grunt');
var fs = require('fs');

exports.jade = {
  compile: function(test) {
    'use strict';

    test.expect(5);

    var actual = grunt.file.read('tmp/jade.html');
    var expected = grunt.file.read('test/expected/jade.html');
    test.equal(expected, actual, 'should compile jade templates to html');

    actual = grunt.file.read('tmp/jade2.html');
    expected = grunt.file.read('test/expected/jade2.html');
    test.equal(expected, actual, 'should compile jade templates to html (multiple files support)');

    actual = grunt.file.read('tmp/jadeInclude.html');
    expected = grunt.file.read('test/expected/jadeInclude.html');
    test.equal(expected, actual, 'should compile jade templates to html with an include');

    actual = grunt.file.read('tmp/jadeTemplate.html');
    expected = grunt.file.read('test/expected/jadeTemplate.html');
    test.equal(expected, actual, 'should compile jade templates to html with grunt template support');
    
    actual = fs.readdirSync('tmp/individual').sort();
    expected = fs.readdirSync('test/expected/individual').sort();
    test.deepEqual(expected, actual, 'should compile jade templates individually to html files');
    
    test.done();
  },
  flatten: function(test) {
    'use strict';

    test.expect(1);

    var actual = fs.readdirSync('tmp/individual_flatten').sort();
    var expected = fs.readdirSync('test/expected/individual_flatten').sort();
    test.deepEqual(expected, actual, 'should compile jade templates individually to html files (to flat structure)');

    test.done();
  }
};
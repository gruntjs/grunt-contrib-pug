var grunt = require('grunt');

exports['jade'] = {
  main: function(test) {
    'use strict';

    var expect, result;

    test.expect(4);

    expect = '<div id="test" class="test"><span id="data">data</span><div>testing</div></div>';
    result = grunt.file.read('tmp/jade.html');
    test.equal(expect, result, 'should compile jade templates to html');

    expect = '<div id="test" class="test"><span id="data">data</span><div>testing 2</div></div>';
    result = grunt.file.read('tmp/jade2.html');
    test.equal(expect, result, 'should compile jade templates to html (multiple files support)');

    expect = "<html><head><title>TEST</title></head><body></body></html><p>hello jade test</p>";
    result = grunt.file.read("tmp/jadeInclude.html");
    test.equal(expect, result, 'should compile jade templates to html with an include');

    expect = '<div>' + grunt.template.today('yyyy') + '</div>';
    result = grunt.file.read('tmp/jadeTemplate.html');
    test.equal(expect, result, 'should compile jade templates to html with grunt template support');

    test.done();
  }
};
/*
 * grunt-contrib-jade
 * http://gruntjs.com/
 *
 * Copyright (c) 2012 Eric Woroshow, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  grunt.registerMultiTask('jade', 'Compile Jade templates into HTML.', function() {
    var helpers = require('grunt-lib-contrib').init(grunt);
    var options = this.options({
      data: {}
    });

    grunt.verbose.writeflags(options, 'Options');

    var files = grunt.file.expandFiles(this.file.src);
    var taskOutput = files.map(function(file) {
      return compileJade(file, options, options.data);
    });

    if (taskOutput.length > 0) {
      grunt.file.write(this.file.dest, taskOutput.join('\n'));
      grunt.log.writeln('File ' + this.file.dest.cyan + ' created.');
    }
  });

  var compileJade = function(srcFile, options, data) {
    options = grunt.util._.extend({filename: srcFile}, options);
    delete options.data;

    var srcCode = grunt.file.read(srcFile);

    try {
      return require('jade').compile(srcCode, options)(data);
    } catch (e) {
      grunt.log.error(e);
      grunt.fail.warn('Jade failed to compile.');
    }
  };
};

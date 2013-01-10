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
    var options = this.options({
      data: {}
    });

    grunt.verbose.writeflags(options, 'Options');

    this.files.forEach(function(f) {
      var taskOutput = f.src.map(function(file) {
        return compileJade(file, options, options.data);
      });

      if (taskOutput.length > 0) {
        grunt.file.write(f.dest, taskOutput.join('\n'));
        grunt.log.writeln('File ' + f.dest.cyan + ' created.');
      }
    });
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

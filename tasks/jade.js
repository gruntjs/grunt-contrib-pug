/*
 * grunt-contrib-jade
 * http://gruntjs.com/
 *
 * Copyright (c) 2012 Eric Woroshow, contributors
 * Licensed under the MIT license.
 * https://github.com/gruntjs/grunt-contrib-jade/blob/master/LICENSE-MIT
 */

module.exports = function(grunt) {
  'use strict';

  // TODO: ditch this when grunt v0.4 is released
  grunt.util = grunt.util || grunt.utils;

  grunt.registerMultiTask('jade', 'Compile Jade templates into HTML.', function() {
    var helpers = require('grunt-contrib-lib').init(grunt);
    var path = require('path');

    var options = helpers.options(this, {
      data: {},
      flatten: false,
      basePath: false
    });

    grunt.verbose.writeflags(options, 'Options');

    // TODO: ditch this when grunt v0.4 is released
    this.files = this.files || helpers.normalizeMultiTaskFiles(this.data, this.target);
    var basePath;
    var newFileDest;
    
    var srcFiles;
    var srcCompiled;
    var taskOutput;

    this.files.forEach(function(file) {
      file.dest = path.normalize(file.dest);
      srcFiles = grunt.file.expandFiles(file.src);
      
      if (srcFiles.length === 0) {
        grunt.log.writeln('Unable to compile; no valid source files were found.');
        return;
      }
      taskOutput = [];

      srcFiles.forEach(function(srcFile) {
        srcCompiled = compileJade(srcFile, options, options.data);
        
        if (helpers.isIndividualDest(file.dest)) {
          basePath = helpers.findBasePath(srcFiles, options.basePath);
          newFileDest = helpers.buildIndividualDest(file.dest, srcFile, basePath, options.flatten);

          grunt.file.write(newFileDest, srcCompiled || '');
          grunt.log.writeln('File ' + newFileDest.cyan + ' created.');          
        } else {
          taskOutput.push(compileJade(srcFile, options, options.data));
        }
        
      });

      if (taskOutput.length > 0) {
        grunt.file.write(file.dest, taskOutput.join('\n'));
        grunt.log.writeln('File ' + file.dest.cyan + ' created.');
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
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
      var output = f.src.map(function(file) {
        return compileJade(file, options, options.data);
      }).join(grunt.util.normalizelf(grunt.util.linefeed));

      if (output.length < 1) {
        grunt.log.warn('Destination not written because compiled files were empty.');
      } else {
        grunt.file.write(f.dest, output);
        grunt.log.writeln('File ' + f.dest.cyan + ' created.');
      }
    });
  });

  var compileJade = function(srcFile, options, data) {
    options = grunt.util._.extend({filename: srcFile}, options);
    delete options.data;

    var srcCode = grunt.file.read(srcFile);

    try {
      var fn = require('jade').compile(srcCode, options);
      if(options.client) {
        var wrapperType = options.wrapper || 'jst';
        var processName = options.processName || function(src) { return src.replace('.jade', ''); };
        var wrapper = wrapTemplate[wrapperType];
        var templateName = processName(srcFile);

        return wrapper ? wrapper.call(null, fn, templateName) : fn;
      } else {
        return fn(data);
      }
    } catch (e) {
      grunt.log.error(e);
      grunt.fail.warn('Jade failed to compile.');
    }
  };

  var wrapTemplate = {
    amd: function(fn) {
      return 'define(["jade"], function (jade) { if(jade && jade["runtime"] !== undefined) { jade = jade.runtime; } return ' + fn.toString() + ' });';
    },

    jst: function(fn, templateName) {
      return 'this.JST = this.JST || []; this.JST["' + templateName + '"] = ' + fn.toString();
    }
  };
};

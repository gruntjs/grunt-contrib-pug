/*
 * grunt-contrib-jade
 * http://gruntjs.com/
 *
 * Copyright (c) 2012 Eric Woroshow, contributors
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {
  'use strict';

  var jade = require('jade');

  // TODO: ditch this when grunt v0.4 is released
  grunt.util = grunt.util || grunt.utils;

  grunt.registerMultiTask('jade', 'Compile Jade templates into HTML or JavaScript.', function() {
    var helpers = require('grunt-lib-contrib').init(grunt);

    var options = helpers.options(this, {
      data: {},
      templatesArray : 'JadeTemplates',
      templatePath : 'templates'
    });

    grunt.verbose.writeflags(options, 'Options');

    // TODO: ditch this when grunt v0.4 is released
    this.files = this.files || helpers.normalizeMultiTaskFiles(this.data, this.target);

    var srcFiles;
    var taskOutput;
    var basePath;

    this.files.forEach(function(file) {
      srcFiles = grunt.file.expandFiles(file.src);
      basePath = helpers.findBasePath(srcFiles);

      taskOutput = [];

      srcFiles.forEach(function(srcFile) {
        options = grunt.util._.extend({filename: srcFile}, options);
        delete options.data;

        var srcCode = grunt.file.read(srcFile);

        if (options.client) {
          taskOutput.push(compileJadeTemplate(srcCode, srcFile, basePath, options));        
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
    try {
      return jade.compile(srcCode, options)(data);
    } catch (e) {
      grunt.log.error(e);
      grunt.fail.warn('Jade failed to compile.');
    }
  };

  var compileJadeTemplate = function(srcCode, srcFile, basePath, options){
    var templateName = options.templatePath + srcFile.replace(basePath, '').replace('.jade', '');

    // get template function
    var js = jade.compile(srcCode, options).toString();

    // needed for jade runtime
    var attrs = jade.runtime.attrs.toString();
    var escape = jade.runtime.escape.toString();
    var rethrow = jade.runtime.rethrow.toString();
    var merge = jade.runtime.merge.toString();
    var runtime = (escape + attrs + rethrow + merge).replace(/exports\./g, '');

    // needed to make things work...
    js = 'if(window.' + options.templatesArray + ' === undefined){window.' + options.templatesArray + '={};}\n' + js;
    js = js.replace('function anonymous', options.templatesArray + '[\'' + templateName + '\'] = function');
    js = js.replace(/buf = \[\];/, 'buf = [];' + runtime + '\n'); // make the runtime functions available
    js = js.replace(/^attrs.*$/gm, ''); // attrs line references "jade" object that doesn't exist

    // remove debug statements and format code nicely
    if(!options.debug){
      js = js.replace(/^var __jade.*$/gm, ''); // get rid of __jade debug object
      js = js.replace(/^try.*$/gm, ''); // get rid of outer try block
      js = js.replace(/^__jade\..*$\n/gm, ''); // git rid of debug statements
      js = js.replace(/\n{2,}/g, ''); // get rid of blank lines
      js = js.replace('{var buf', '{\nvar buf'); // the above line is slight greedier than I want it
      js = js.substring(0, js.indexOf('} catch')) + '};'; // get rid of catch block, since there is no try
    }
    return js;
  };
};
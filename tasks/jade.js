/*
 * grunt-contrib-jade
 * http://gruntjs.com/
 *
 * Copyright (c) 2014 Eric Woroshow, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  var helpers = require('grunt-lib-contrib').init(grunt);
  var chalk = require('chalk');

  // content conversion for templates
  var defaultProcessContent = function(content) { return content; };

  // filename conversion for templates
  var defaultProcessName = function(name) { return name.replace('.jade', ''); };

  grunt.registerMultiTask('jade', 'Compile jade templates.', function() {
    var options = this.options({
      namespace: 'JST',
      separator: grunt.util.linefeed + grunt.util.linefeed,
      amd: false
    });

    var data = options.data;
    delete options.data;

    var nsInfo;

    if (options.namespace !== false) {
      nsInfo = helpers.getNamespaceDeclaration(options.namespace);
    }

    // assign transformation functions
    var processContent = options.processContent || defaultProcessContent;
    var processName = options.processName || defaultProcessName;

    this.files.forEach(function(f) {
      var templates = [];

      f.src.filter(function(filepath) {
        // warn on and remove invalid source files (if nonull was set)
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      })
      .forEach(function(filepath) {
        var src = processContent(grunt.file.read(filepath));
        var compiled, filename;
        filename = processName(filepath);

        options.filename = filepath;

        try {
          var jade = f.orig.jade = require('jade');
          if (typeof data === 'function') {
            // if data is function, bind to f.orig, passing f.dest and f.src
            f.orig.data = data.call(f.orig, f.dest, f.src);
          } else {
            f.orig.data = data;
          }
          if (options.filters) {
            Object.keys(options.filters).forEach(function(filter) {
              jade.filters[filter] = options.filters[filter].bind(f.orig);
            });
          }
          // if in client mode, return function source
          if (options.client) {
            compiled = jade.compileClient(src, options).toString();
          } else {
            compiled = jade.compile(src, options)(f.orig.data);
          }

          // if configured for AMD and the namespace has been explicitly set
          // to false, the Jade template will be directly returned
          if (options.client && options.amd && options.namespace === false) {
            compiled = 'return ' + compiled;
          }
        } catch (e) {
          grunt.log.warn('Jade failed to compile "' + filepath + '".');
          grunt.log.error(e);
          return false;
        }

        if (options.client && options.namespace !== false) {
          templates.push(nsInfo.namespace + '[' + JSON.stringify(filename) + '] = ' + compiled + ';');
        } else {
          templates.push(compiled);
        }
      });

      var output = templates;
      if (output.length < 1) {
        grunt.log.warn('Destination not written because compiled files were empty.');
      } else {
        if (options.client && options.namespace !== false) {
          output.unshift(nsInfo.declaration);

          if (options.node) {
            output.unshift('var jade = jade || require(\'jade\').runtime;');

            var nodeExport = 'if (typeof exports === \'object\' && exports) {';
            nodeExport += 'module.exports = ' + nsInfo.namespace + ';}';

            output.push(nodeExport);
          }
        }

        if (options.amd) {
          // wrap the file in an AMD define function
          output.unshift('define([\'jade\'], function(jade) { if(jade && jade[\'runtime\'] !== undefined) { jade = jade.runtime; }');
          if (options.namespace !== false) {
            // namespace has not been explicitly set to false;
            // the AMD wrapper will return the object containing the template
            output.push('return ' + nsInfo.namespace + ';');
          }
          output.push('});');
        }

        grunt.file.write(f.dest, output.join(grunt.util.normalizelf(options.separator)));
        grunt.log.writeln('File ' + chalk.cyan(f.dest) + ' created.');
      }
    });

  });

};

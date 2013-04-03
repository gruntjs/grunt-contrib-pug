/*
 * grunt-contrib-jade
 * http://gruntjs.com/
 *
 * Copyright (c) 2012 Eric Woroshow, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  var _ = grunt.util._;
  var helpers = require('grunt-lib-contrib').init(grunt);

  // content conversion for templates
  var defaultProcessContent = function(content) { return content; };

  // filename conversion for templates
  var defaultProcessName = function(name) { return name.replace('.jade', ''); };

  // If running on multiple processes, split render tasks into even groups.
  var jadeSpawn = function(){

    var currentTask = grunt.task.current,
        done = currentTask.async(),
        files = currentTask.files,
        spawnCount = currentTask.data.options.spawnProcesses,
        filesPerProcess = Math.floor(files.length / spawnCount),
        filePosition = 0,
        processPosition = 0;

    if ( files.length < spawnCount ) {
      spawnCount = files.length;
      filesPerProcess = 1;
    }

    var spawnDone = function(error, result, code) {

      if (error) {
        grunt.fail.warn(result.stdout);
      }

      // Get stdout of spawned process and find the pertinent lines for CLI success feedback.
      grunt.log.writeln(result.stdout.split('\n').filter(function(resultLine){
        resultLine = resultLine.toLowerCase();
        return (resultLine.search('file') > -1 && resultLine.search('created') > -1);
      }).join('\n'));

      processPosition++;
      if ( processPosition === spawnCount * 1 ) {
        done();
      }
    };

    for ( var i = 0; i < spawnCount; i++ ) {

      var childTasks = [],
          startPoint = filePosition,
          endOffset = ( i < files.length % spawnCount ) ? 1 : 0;

      for ( var j = startPoint; j < startPoint + filesPerProcess + endOffset; j++ ) {
        childTasks.push('jade-single:' + files[j].src.join(',') + ":" + currentTask.target);
        filePosition++;
      }

      // If there are any current options, extend them onto the new process list. (--deploy, etc.)
      childTasks = childTasks.concat(grunt.option.flags());

      grunt.util.spawn({
        grunt: true,
        args: childTasks
      }, spawnDone);
    }
  };

  grunt.registerMultiTask('jade', 'Compile jade templates.', function() {
    var options = this.options({
      namespace: 'JST',
      separator: grunt.util.linefeed + grunt.util.linefeed,
      spawnProcesses: 0,
      amd: false
    });
    grunt.verbose.writeflags(options, 'Options');

    var data = options.data;
    delete options.data;

    var nsInfo;

    if (options.spawnProcesses > 1 && this.files.length > 1) {
      jadeSpawn();
      return;
    }

    if(options.namespace !== false){
      nsInfo = helpers.getNamespaceDeclaration(options.namespace);
    }

    // assign transformation functions
    var processContent = options.processContent || defaultProcessContent;
    var processName = options.processName || defaultProcessName;

    this.files.forEach(function(f) {
      var templates = [];

      f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
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

        options = grunt.util._.extend(options, { filename: filepath });

        try {
          compiled = require('jade').compile(src, options);
          // if in client mode, return function source
          if (options.client) {
            compiled = compiled.toString();
          } else {
            compiled = compiled(data);
          }

          // if configured for amd and the namespace has been explicitly set
          // to false, the jade template will be directly returned
          if (options.client && options.amd && options.namespace === false) {
            compiled = 'return ' + compiled;
          }
        } catch (e) {
          grunt.log.error(e);
          grunt.fail.warn('Jade failed to compile '+filepath+'.');
        }

        if (options.client && options.namespace !== false) {
          templates.push(nsInfo.namespace+'['+JSON.stringify(filename)+'] = '+compiled+';');
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
          // Wrap the file in an AMD define fn.
          output.unshift("define(['jade'], function(jade) { if(jade && jade['runtime'] !== undefined) { jade = jade.runtime; }");
          if (options.namespace !== false) {
            // Namespace has not been explicitly set to false; the AMD
            // wrapper will return the object containing the template.
            output.push("return "+nsInfo.namespace+";");
          }
          output.push("});");
        }

        grunt.file.write(f.dest, output.join(grunt.util.normalizelf(options.separator)));
        grunt.log.writeln('File "' + f.dest + '" created.');
      }
    });

  });

  grunt.registerTask('jade-single', function(filePaths, parentTask){

    filePaths = filePaths.split(',');

    var files = grunt.task.normalizeMultiTaskFiles(grunt.config('jade.' + parentTask)),
        options = grunt.config('jade.' + parentTask).options,
        buildFiles = [];

    // Find the sources in the parent's normalized file list that match filePaths.
    files.forEach(function(f){
      if ( _.intersection(filePaths, f.src).length === filePaths.length && f.src.length === filePaths.length) {
        buildFiles.push(f);
      }
    });

    delete options.spawnProcesses;

    grunt.config('jade.jadeSingle', {
      options: options,
      files: buildFiles
    });

    grunt.task.run('jade:jadeSingle');
  });
};

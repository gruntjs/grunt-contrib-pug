/*
 * grunt-contrib-jade
 * http://gruntjs.com/
 *
 * Copyright (c) 2015 Eric Woroshow, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      test: ['tmp']
    },

    // Configuration to be run (and then tested).
    jade: {
      compile: {
        files: {
          'tmp/jade.html': ['test/fixtures/jade.jade'],
          'tmp/jade2.html': ['test/fixtures/jade2.jade'],
          'tmp/jadeInclude.html': ['test/fixtures/jadeInclude.jade'],
          'tmp/jadeTemplate.html': ['test/fixtures/jadeTemplate.jade'],
          'tmp/jadeUsingmixin.html': ['test/fixtures/jadeUsingmixin.jade']
        },
        options: {
          data: {
            test: true,
            year: '<%= grunt.template.today("yyyy") %>'
          }
        }
      },

      compile_amd: {
        files: {
          'tmp/amd/jade.js': ['test/fixtures/jade.jade'],
          'tmp/amd/jade2.js': ['test/fixtures/jade2.jade'],
          'tmp/amd/jadeInclude.js': ['test/fixtures/jadeInclude.jade'],
          'tmp/amd/jadeTemplate.js': ['test/fixtures/jadeTemplate.jade']
        },
        options: {
          client: true,
          amd: true,
          namespace: false,
          compileDebug: false,
          data: {
            test: true,
            year: '<%= grunt.template.today("yyyy") %>'
          }
        }
      },

      compile_jst: {
        files: {
          'tmp/jst/jade.js': ['test/fixtures/jade.jade'],
          'tmp/jst/jade2.js': ['test/fixtures/jade2.jade'],
          'tmp/jst/jadeInclude.js': ['test/fixtures/jadeInclude.jade'],
          'tmp/jst/jadeTemplate.js': ['test/fixtures/jadeTemplate.jade']
        },
        options: {
          client: true,
          compileDebug: false,
          processName: function(str) { return str.match(/^test\/fixtures\/(.*)\.jade$/)[1]; },
          data: {
            test: true,
            year: '<%= grunt.template.today("yyyy") %>'
          }
        }
      },
      compile_dynamic_data: {
        files: {
          'tmp/jadeDynamicData.html': ['test/fixtures/jadeDynamicData.jade']
        },
        options: {
          compileDebug: false,
          data: function(dest, src) {
            return {
              dest: dest,
              src: src
            };
          }
        }
      },
      compile_inline_filters: {
        files: {
          'tmp/inlineFilters.html': ['test/fixtures/jadeFilters.jade']
        },
        options: {
          filters: {
            some: function(block) {
              return 'some: ' + block;
            },
            another: function(block) {
              return 'another: ' + block;
            }
          },
          data: function(dest, src) {
            return {
              dest: dest,
              src: src
            };
          }
        }
      },
      compile_exported_filters: {
        files: {
          'tmp/exportedFilters.html': ['test/fixtures/jadeFilters.jade']
        },
        options: {
          filters: require('./test/fixtures/inc/filters.js'),
          data: function(dest, src) {
            return {
              dest: dest,
              src: src
            };
          }
        }
      },
      compile_advanced_filters: {
        files: {
          'tmp/jadeAdvancedFilters.html': ['test/fixtures/jadeAdvancedFilters.jade']
        },
        options: {
          filters: require('./test/fixtures/inc/advancedFilters.js'),
          data: function() {
            return require('./test/fixtures/inc/locals.json');
          }
        }
      },
    },


    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-internal');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['jshint', 'clean', 'jade', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['test', 'build-contrib']);

};

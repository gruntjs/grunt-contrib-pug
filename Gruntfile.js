/*
 * grunt-contrib-pug
 * http://gruntjs.com/
 *
 * Copyright (c) 2016 Eric Woroshow, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/**/*.js',
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
    pug: {
      compile: {
        files: {
          'tmp/pug.html': ['test/fixtures/pug.pug'],
          'tmp/pug2.html': ['test/fixtures/pug2.pug'],
          'tmp/pugInclude.html': ['test/fixtures/pugInclude.pug'],
          'tmp/pugTemplate.html': ['test/fixtures/pugTemplate.pug'],
          'tmp/pugUsingmixin.html': ['test/fixtures/pugUsingmixin.pug'],
          'tmp/pugCodeBlock.html': ['test/fixtures/pugCodeBlock.pug']
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
          'tmp/amd/pug.js': ['test/fixtures/pug.pug'],
          'tmp/amd/pug2.js': ['test/fixtures/pug2.pug'],
          'tmp/amd/pugInclude.js': ['test/fixtures/pugInclude.pug'],
          'tmp/amd/pugTemplate.js': ['test/fixtures/pugTemplate.pug']
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
          'tmp/jst/pug.js': ['test/fixtures/pug.pug'],
          'tmp/jst/pug2.js': ['test/fixtures/pug2.pug'],
          'tmp/jst/pugInclude.js': ['test/fixtures/pugInclude.pug'],
          'tmp/jst/pugTemplate.js': ['test/fixtures/pugTemplate.pug']
        },
        options: {
          client: true,
          compileDebug: false,
          processName: function(str) { return str.match(/^test\/fixtures\/(.*)\.pug$/)[1]; },
          data: {
            test: true,
            year: '<%= grunt.template.today("yyyy") %>'
          }
        }
      },
      compile_dynamic_data: {
        files: {
          'tmp/pugDynamicData.html': ['test/fixtures/pugDynamicData.pug']
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
          'tmp/inlineFilters.html': ['test/fixtures/pugFilters.pug']
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
          'tmp/exportedFilters.html': ['test/fixtures/pugFilters.pug']
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
          'tmp/pugAdvancedFilters.html': ['test/fixtures/pugAdvancedFilters.pug']
        },
        options: {
          filters: require('./test/fixtures/inc/advancedFilters.js'),
          data: function() {
            return require('./test/fixtures/inc/locals.json');
          }
        }
      }
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
  grunt.registerTask('test', ['jshint', 'clean', 'pug', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['test', 'build-contrib']);

};

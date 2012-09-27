# grunt-contrib-jade [![Build Status](https://secure.travis-ci.org/gruntjs/grunt-contrib-jade.png?branch=master)](http://travis-ci.org/gruntjs/grunt-contrib-jade)
> Compile Jade files to HTML (part of the [grunt-contrib](https://github.com/gruntjs/grunt-contrib) collection). Submitted by [Eric Woroshow](https://github.com/errcw).

### Overview

Inside your `grunt.js` file add a section named `jade`. This section specifies files to compile and the options passed to [jade](https://github.com/visionmedia/jade#public-api).

#### Parameters

##### files ```object```

This defines what files this task will process and should contain key:value pairs.

The key (destination) should be an unique filepath (supports [grunt.template](https://github.com/cowboy/grunt/blob/master/docs/api_template.md)) and the value (source) should be a filepath or an array of filepaths (supports [minimatch](https://github.com/isaacs/minimatch)).

Note: As of now, you can use *.{ext} as your destination filename to individually compile each file to the destination directory. Otherwise, when the source contains an array of multiple filepaths, the contents are concatenated in the order passed.

##### options ```object```

This controls how this task (and its helpers) operate and should contain key:value pairs, see options below.

#### Options

##### data ```object```

Sets the data passed to ```jade``` during template compilation. Any data can be passed to the template (including ```grunt``` templates).

#### basePath ```string``` (individual only)
This option adjusts the folder structure when compiled to the destination directory. When not explicitly set, best effort is made to locate the basePath by comparing all source filepaths left to right for a common pattern.

#### flatten ```boolean``` (individual only)
This option performs a flat compile that dumps all the files into the root of the destination directory, overwriting files if they exist.

#### Config Examples

``` javascript
jade: {
  compile: {
    options: {
      data: {
        debug: false
      }
    },
    files: {
      "path/to/dest.html": ["path/to/templates/*.jade", "another/path/tmpl.jade"]
    }
  }
}
```

If you want to generate a debug file and a release file from the same template:

``` javascript
jade: {
  debug: {
    options: {
      data: {
        debug: true
      }
    },
    files: {
      "debug.html": "test.jade"
    }
  },
  release: {
    options: {
      data: {
        debug: false
      }
    },
    files: {
      "release.html": "test.jade"
    }
  }
}
```

If you want to use `grunt` template in `options.data`:

``` javascript
jade: {
  debug: {
    options: {
      data: {
        debug: true,
        timestamp: "<%= new Date().getTime() %>"
      }
    },
    files: {
      "debug.html": "test.jade"
    }
  }
}
```

or you can use `grunt` helpers (grunt object was exposed at template context):

``` javascript
jade: {
  debug: {
    options: {
      data: {
        debug: true,
        timestamp: "<%= grunt.template.today() %>"
      }
    },
    files: {
      "debug.html": "test.jade"
    }
  }
}
```

Flatten all files from a nested structure into a single folder:

``` javascript
jade: {
  debug: {
    options: {
      flatten: true
    },
    files: {
      "my/destination/*.html": ["test.jade", "test2.jade", "deep/nested/jade.jade"]
    }
  }
}

```

## Release History
* 2012/09/24 - v0.3.0 - general cleanup and consolidation. test refactoring. global options depreciated.
* 2012/09/10 - v0.2.0 - refactored from grunt-contrib into individual repo.
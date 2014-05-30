# grunt-contrib-jade v0.12.0 [![Build Status: Linux](https://travis-ci.org/gruntjs/grunt-contrib-jade.png?branch=master)](https://travis-ci.org/gruntjs/grunt-contrib-jade) <a href="https://ci.appveyor.com/project/gruntjs/grunt-contrib-jade"><img src="https://ci.appveyor.com/api/projects/status/p24tu0v9akk906yq/branch/master" alt="Build Status: Windows" height="18" /></a>

> Compile Jade templates.



## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-contrib-jade --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-contrib-jade');
```

*This plugin was designed to work with Grunt 0.4.x. If you're still using grunt v0.3.x it's strongly recommended that [you upgrade](http://gruntjs.com/upgrading-from-0.3-to-0.4), but in case you can't please use [v0.3.1](https://github.com/gruntjs/grunt-contrib-jade/tree/grunt-0.3-stable).*



## Jade task
_Run this task with the `grunt jade` command._

Task targets, files and options may be specified according to the grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.
### Options

#### pretty
Type: `Boolean`
Default: **false**

Output indented HTML.

#### data
Type: `Object`

Sets the data passed to Jade during template compilation. Any data can be passed to the template (including grunt templates).

This value also might be a function taking source and destination path as arguments and returning a data object. Within the function, `this` is bound to the file configuration object.

```js
options: {
  data: function(dest, src) {
    return {
      from: src,
      to: dest
    };
  }
}
```

or you can have options from a required JSON file:

```js
options: {
  data: function(dest, src) {
    // Return an object of data to pass to templates
    return require('./locals.json');
  }
}
```

#### filters
Type: `Object`

If you want to use filters you have two ways to do it. First you can write your filters inline within your Gruntfile.js or define filters in separate file and export it.

Filters are given a context with the `jade` instance and local variables: `{jade: jade, data: data}`, where `jade` is global jade instance and `data` is options passed to `options.data`. You can use `this.jade.render()` inside your filters to render the content of a block and locals as `#{variable}` from your data.

##### Inline filters

*Gruntfile.js:*
```js
options: {
  filters: {
    some: function(block) {},
    another: function(block) {}
  }
}
```

##### Exported filters

*Gruntfile.js:*
```js
options: {
  filters: require('./filters.js')
}
```

*filters.js:*
```js
var jadefilters = module.exports = {};
jadefilters.some = function(block) {};
jadefilters.another = function(block) {};
```

#### compileDebug
Type: `Boolean`
Default: **true**

Add Jade debug instructions to generated JS templates.

#### client
Type: `Boolean`
Default: **false**

Compile to JS template functions for client-side use rather than directly to HTML.

Make sure to also include the Jade runtime (only `runtime.js`) as described in the [Jade documentation](https://github.com/visionmedia/jade#browser-support).

#### namespace
Type: `String`, `Boolean`
Default: **JST**

The namespace in which the precompiled templates will be assigned. Use dot notation (*e.g.* `App.Templates`) for nested namespaces or `false` for no namespace wrapping.

When set to `false` with **amd** option set to `true`, the templates will be returned directly from the AMD wrapper.


#### amd
Type: `Boolean`
Default: **false**

Wraps the output file with an AMD define function and returns the compiled template namespace unless namespace has been explicitly set to false in which case the template function will be returned directly.

```js
define(function() {
    //...//
    returns this['[template namespace]'];
});
```

#### processName
Type: `Function`

This option accepts a function which takes one argument (the template filepath) and returns a string which will be used as the key for the precompiled template object.

**Example**
Store all template on the default JST namespace in capital letters.

```js
options: {
  processName: function(filename) {
    return filename.toUpperCase();
  }
}
```

#### processContent
Type: `Function`
Default: `function(content) { return content; };`

This option accepts a function that lets you perform additional content processing.

### Usage Examples

```js
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

```js
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

```js
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

```js
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


## Release History

 * 2014-05-29   v0.12.0   Update to jade 1.3. Make jade task to fail on an error.
 * 2014-03-02   v0.11.0   Document 'processContent'. Bump to jade 1.2. Update copyright to 2014. Remove lodash-node module.
 * 2014-01-20   v0.10.0   Bump jade version to ~1.1.5 Fix AUTHORS
 * 2014-01-04   v0.9.1   Bump jade version to 1.0.2 Use node-lodash instead of grunt.util._
 * 2013-12-24   v0.9.0   Bump jade version to 1.0.0
 * 2013-07-29   v0.8.0   Bump jade version to 0.34.1
 * 2013-06-06   v0.7.0   Bump jade version / fix tests
 * 2013-05-15   v0.6.0   Bump jade version / fix tests
 * 2013-05-06   v0.5.1   Allow options.data to be a function
 * 2013-03-07   v0.5.0   Allow compilation to JS functions Support JST and AMD formats
 * 2013-02-15   v0.4.0   First official release for Grunt 0.4.0.
 * 2013-01-24   v0.4.0rc7   Updating grunt/gruntplugin dependencies to rc7. Changing in-development grunt/gruntplugin dependency versions from tilde version ranges to specific versions.
 * 2013-01-09   v0.4.0rc5   Updating to work with grunt v0.4.0rc5. Switching to this.files api.
 * 2012-10-12   v0.3.1   Rename grunt-contrib-lib dep to grunt-lib-contrib.
 * 2012-09-24   v0.3.0   Options no longer accepted from global config key.
 * 2012-09-10   v0.2.0   Refactored from grunt-contrib into individual repo.

---

Task submitted by [Eric Woroshow](http://ericw.ca/)

*This file was generated on Thu May 29 2014 19:27:22.*

# grunt-contrib-pug v3.0.0 [![Build Status](https://github.com/gruntjs/grunt-contrib-pug/workflows/Tests/badge.svg)](https://github.com/gruntjs/grunt-contrib-pug/actions?workflow=Tests)

> Compile Pug templates



## Getting Started

If you haven't used [Grunt](https://gruntjs.com/) before, be sure to check out the [Getting Started](https://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](https://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-contrib-pug --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-contrib-pug');
```




## Pug task
_Run this task with the `grunt pug` command._

Task targets, files and options may be specified according to the grunt [Configuring tasks](https://gruntjs.com/configuring-tasks) guide.
### Options

#### pretty
Type: `Boolean`  
Default: `false`

Output indented HTML.

#### data
Type: `Object`

Sets the data passed to Pug during template compilation. Any data can be passed to the template (including grunt templates).

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

Filters are given a context with the `pug` instance and local variables: `{pug: pug, data: data}`, where `pug` is global pug instance and `data` is options passed to `options.data`. You can use `this.pug.render()` inside your filters to render the content of a block and locals as `#{variable}` from your data.

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
var pugfilters = module.exports = {};
pugfilters.some = function(block) {};
pugfilters.another = function(block) {};
```

#### compileDebug
Type: `Boolean`  
Default: `true`

Add Pug debug instructions to generated JS templates.

#### client
Type: `Boolean`  
Default: `false`

Compile to JS template functions for client-side use rather than directly to HTML.

Make sure to also include the Pug runtime (only `runtime.js`) as described in the [Pug documentation](https://github.com/visionmedia/pug#browser-support).

#### namespace
Type: `String`, `Boolean`  
Default: `'JST'`

The namespace in which the precompiled templates will be assigned. Use dot notation (*e.g.* `App.Templates`) for nested namespaces or `false` for no namespace wrapping.

When set to `false` with **amd** option set to `true`, the templates will be returned directly from the AMD wrapper.


#### amd
Type: `Boolean`  
Default: `false`

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
Default: `function(content, filename) { return content; };`

This option accepts a function that lets you perform additional content processing.

### Usage Examples

```js
pug: {
  compile: {
    options: {
      data: {
        debug: false
      }
    },
    files: {
      'path/to/dest.html': ['path/to/templates/*.pug', 'another/path/tmpl.pug']
    }
  }
}
```

If you want to generate a debug file and a release file from the same template:

```js
pug: {
  debug: {
    options: {
      data: {
        debug: true
      }
    },
    files: {
      'debug.html': 'test.pug'
    }
  },
  release: {
    options: {
      data: {
        debug: false
      }
    },
    files: {
      'release.html': 'test.pug'
    }
  }
}
```

If you want to use `grunt` template in `options.data`:

```js
pug: {
  debug: {
    options: {
      data: {
        debug: true,
        timestamp: '<%= new Date().getTime() %>'
      }
    },
    files: {
      'debug.html': 'test.pug'
    }
  }
}
```

or you can use `grunt` helpers (grunt object was exposed at template context):

```js
pug: {
  debug: {
    options: {
      data: {
        debug: true,
        timestamp: '<%= grunt.template.today() %>'
      }
    },
    files: {
      'debug.html': 'test.pug'
    }
  }
}
```


## Release History

 * 2021-02-23   v3.0.0   Update to pug 3.0.0 Drop Node.js < 10 support.
 * 2018-09-07   v2.0.0   Drop Node.js < 6 support. Update dependencies.
 * 2016-03-04   v1.0.0   Point main to task and remove peerDeps. Update docs and tests.
 * 2015-07-08   v0.15.0   Update to jade 1.11.0. Add test for Codeblocks
 * 2014-02-02   v0.14.1   Add filename to `processContent` arguments.
 * 2014-12-23   v0.14.0   Update to jade 1.8.2.
 * 2014-09-30   v0.13.0   Update to jade 1.7.0.
 * 2014-05-29   v0.12.0   Update to jade 1.3. Make jade task fail on an error.
 * 2014-03-02   v0.11.0   Document `processContent`. Bump to jade 1.2. Update copyright to 2014. Remove lodash-node module.
 * 2014-01-20   v0.10.0   Bump jade version to ~1.1.5. Fix AUTHORS.
 * 2014-01-04   v0.9.1   Bump jade version to 1.0.2. Use node-lodash instead of `grunt.util._`.
 * 2013-12-24   v0.9.0   Bump jade version to 1.0.0.
 * 2013-07-29   v0.8.0   Bump jade version to 0.34.1.
 * 2013-06-06   v0.7.0   Bump jade version / fix tests.
 * 2013-05-15   v0.6.0   Bump jade version / fix tests.
 * 2013-05-06   v0.5.1   Allow `options.data` to be a function.
 * 2013-03-07   v0.5.0   Allow compilation to JS functions. Support JST and AMD formats.
 * 2013-02-15   v0.4.0   First official release for Grunt 0.4.0.
 * 2013-01-24   v0.4.0rc7   Updating grunt/gruntplugin dependencies to rc7. Changing in-development grunt/gruntplugin dependency versions from tilde version ranges to specific versions.
 * 2013-01-09   v0.4.0rc5   Updating to work with grunt v0.4.0rc5. Switching to `this.files` API.
 * 2012-10-12   v0.3.1   Rename grunt-contrib-lib dep to grunt-lib-contrib.
 * 2012-09-24   v0.3.0   Options no longer accepted from global config key.
 * 2012-09-10   v0.2.0   Refactored from grunt-contrib into individual repo.

---

Task submitted by [Eric Woroshow](http://ericw.ca/)

*This file was generated on Wed Feb 24 2021 22:30:18.*

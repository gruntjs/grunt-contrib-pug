# Usage Examples

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

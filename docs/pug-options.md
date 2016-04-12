# Options

## pretty
Type: `Boolean`
Default: `false`

Output indented HTML.

## data
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

## filters
Type: `Object`

If you want to use filters you have two ways to do it. First you can write your filters inline within your Gruntfile.js or define filters in separate file and export it.

Filters are given a context with the `pug` instance and local variables: `{pug: pug, data: data}`, where `pug` is global pug instance and `data` is options passed to `options.data`. You can use `this.pug.render()` inside your filters to render the content of a block and locals as `#{variable}` from your data.

### Inline filters

*Gruntfile.js:*
```js
options: {
  filters: {
    some: function(block) {},
    another: function(block) {}
  }
}
```

### Exported filters

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

## compileDebug
Type: `Boolean`
Default: `true`

Add Pug debug instructions to generated JS templates.

## client
Type: `Boolean`
Default: `false`

Compile to JS template functions for client-side use rather than directly to HTML.

Make sure to also include the Pug runtime (only `runtime.js`) as described in the [Pug documentation](https://github.com/visionmedia/pug#browser-support).

## namespace
Type: `String`, `Boolean`
Default: `'JST'`

The namespace in which the precompiled templates will be assigned. Use dot notation (*e.g.* `App.Templates`) for nested namespaces or `false` for no namespace wrapping.

When set to `false` with **amd** option set to `true`, the templates will be returned directly from the AMD wrapper.


## amd
Type: `Boolean`
Default: `false`

Wraps the output file with an AMD define function and returns the compiled template namespace unless namespace has been explicitly set to false in which case the template function will be returned directly.

```js
define(function() {
    //...//
    returns this['[template namespace]'];
});
```

## processName
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

## processContent
Type: `Function`
Default: `function(content, filename) { return content; };`

This option accepts a function that lets you perform additional content processing.

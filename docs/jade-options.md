# Options

## pretty
Type: `Boolean`
Default: **false**

Output indented HTML.

## data
Type: `Object`

Sets the data passed to Jade during template compilation. Any data can be passed to the template (including grunt templates).

## compileDebug
Type: `Boolean`
Default: **true**

Add Jade debug instructions to generated JS templates.

## client
Type: `Boolean`
Default: **false**

Compile to JS template functions for client-side use rather than directly to HTML.

## namespace
Type: `String`, `Boolean`
Default: **JST**

The namespace in which the precompiled templates will be assigned. Use dot notation (*e.g.* `App.Templates`) for nested namespaces or `false` for no namespace wrapping.

When set to `false` with **amd** option set to `true`, the templates will be returned directly from the AMD wrapper.


## amd
Type: `Boolean`
Default: **false**

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

By default filepaths will be processed to a JS-friendly camelCase equivalent. (*e.g* `jade/example-file.jade` becomes `exampleFile`)

**Example**
Store all template on the default JST namespace in capital letters.

```js
options: {
  processName: function(filename) {
    return filename.toUpperCase();
  }
}
```

this["JST"] = this["JST"] || {};

this["JST"]["pugInclude"] = function template(locals) {
var buf = [];
var pug_mixins = {};
var pug_interp;

buf.push("<html><head><title>TEST</title></head><body></body></html>");
var a = 'hello pug test'
buf.push("<p>" + (pug.escape(null == (pug_interp = a) ? "" : pug_interp)) + "</p>");;return buf.join("");
};

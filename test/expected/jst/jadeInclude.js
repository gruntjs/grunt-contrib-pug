this["JST"] = this["JST"] || {};

this["JST"]["jadeInclude"] = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<html><head><title>TEST</title></head><body></body></html>");
var a = 'hello jade test'
buf.push("<p>" + (jade.escape(null == (jade_interp = a) ? "" : jade_interp)) + "</p>");;return buf.join("");
};
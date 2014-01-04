this["JST"] = this["JST"] || {};

this["JST"]["jadeInclude"] = function template(locals) {
var buf = [];
var jade_mixins = {};

buf.push("<html><head><title>TEST</title></head><body></body></html>");
var a = 'hello jade test'
buf.push("<p>" + (jade.escape(null == (jade.interp = a) ? "" : jade.interp)) + "</p>");;return buf.join("");
};
this["JST"] = this["JST"] || {};

this["JST"]["jadeTemplate"] = function template(locals) {
var buf = [];
var jade_mixins = {};
var locals_ = (locals || {}),year = locals_.year;
buf.push("<div>" + (jade.escape(null == (jade.interp = year) ? "" : jade.interp)) + "</div>");;return buf.join("");
};
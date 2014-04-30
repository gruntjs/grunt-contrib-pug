this["JST"] = this["JST"] || {};

this["JST"]["jadeTemplate"] = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (year) {
buf.push("<div>" + (jade.escape(null == (jade_interp = year) ? "" : jade_interp)) + "</div>");}("year" in locals_for_with?locals_for_with.year:typeof year!=="undefined"?year:undefined));;return buf.join("");
};
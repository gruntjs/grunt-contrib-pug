this["JST"] = this["JST"] || {};

this["JST"]["pug"] = function template(locals) {
var buf = [];
var pug_mixins = {};
var pug_interp;
;var locals_for_with = (locals || {});(function (test) {
buf.push("<div id=\"test\" class=\"test\"><span id=\"data\">data</span>");
if ( test)
{
buf.push("<div>testing</div>");
}
buf.push("</div>");}.call(this,"test" in locals_for_with?locals_for_with.test:typeof test!=="undefined"?test:undefined));;return buf.join("");
};
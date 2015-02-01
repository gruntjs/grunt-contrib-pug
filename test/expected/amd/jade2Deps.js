define(['jade', 'moment', 'another'], function(jade, moment, another) { if(jade && jade['runtime'] !== undefined) { jade = jade.runtime; }

return function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (test) {
buf.push("<div id=\"test\" class=\"test\"><span id=\"data\">data</span>");
if ( test)
{
buf.push("<div>testing 2</div>");
}
buf.push("</div>");}.call(this,"test" in locals_for_with?locals_for_with.test:typeof test!=="undefined"?test:undefined));;return buf.join("");
}

});
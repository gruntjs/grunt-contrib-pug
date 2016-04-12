define(['pug'], function(pug) { if(pug && pug['runtime'] !== undefined) { pug = pug.runtime; }

return function template(locals) {
var buf = [];
var pug_mixins = {};
var pug_interp;
;var locals_for_with = (locals || {});(function (year) {
buf.push("<div>" + (pug.escape(null == (pug_interp = year) ? "" : pug_interp)) + "</div>");}.call(this,"year" in locals_for_with?locals_for_with.year:typeof year!=="undefined"?year:undefined));;return buf.join("");
}

});

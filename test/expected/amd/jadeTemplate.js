define(['jade'], function(jade) { if(jade && jade['runtime'] !== undefined) { jade = jade.runtime; }

return function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
var locals_ = (locals || {}),year = locals_.year;
buf.push("<div>" + (jade.escape(null == (jade_interp = year) ? "" : jade_interp)) + "</div>");;return buf.join("");
}

});
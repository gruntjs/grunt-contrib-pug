define(['jade'], function(jade) { if(jade && jade['runtime'] !== undefined) { jade = jade.runtime; }

return function anonymous(locals) {
var buf = [];
with (locals || {}) {
buf.push("<div>" + (jade.escape(null == (jade.interp = year) ? "" : jade.interp)) + "</div>");
}
return buf.join("");
}

});
this["JST"] = this["JST"] || {};

this["JST"]["pugInclude"] = function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_match_html=/["&<>]/;function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Chtml\u003E\u003Chead\u003E\u003Ctitle\u003ETEST\u003C\u002Ftitle\u003E\u003C\u002Fhead\u003E\u003Cbody\u003E\u003C\u002Fbody\u003E\u003C\u002Fhtml\u003E";
var a = 'hello pug test'
pug_html = pug_html + "\u003Cp\u003E" + (pug_escape(null == (pug_interp = a) ? "" : pug_interp)) + "\u003C\u002Fp\u003E";;return pug_html;};

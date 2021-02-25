this["JST"] = this["JST"] || {};

this["JST"]["pugTemplate"] = function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_match_html=/["&<>]/;function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;
    var locals_for_with = (locals || {});
    
    (function (year) {
      pug_html = pug_html + "\u003Cdiv\u003E" + (pug_escape(null == (pug_interp = year) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E";
    }.call(this, "year" in locals_for_with ?
        locals_for_with.year :
        typeof year !== 'undefined' ? year : undefined));
    ;;return pug_html;};
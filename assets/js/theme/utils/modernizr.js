/*! modernizr 3.2.0 (Custom Build) | MIT *
 * http://modernizr.com/download/?-csspointerevents-hiddenscroll-inlinesvg-mediaqueries-svg-svgasimg-svgfilters-touchevents-setclasses-shiv !*/
!function(e,t,n){function o(e,t){return typeof e===t}function r(){var e,t,n,r,a,i,s;for(var l in d)if(d.hasOwnProperty(l)){if(e=[],t=d[l],t.name&&(e.push(t.name.toLowerCase()),t.options&&t.options.aliases&&t.options.aliases.length))for(n=0;n<t.options.aliases.length;n++)e.push(t.options.aliases[n].toLowerCase());for(r=o(t.fn,"function")?t.fn():t.fn,a=0;a<e.length;a++)i=e[a],s=i.split("."),1===s.length?Modernizr[s[0]]=r:(!Modernizr[s[0]]||Modernizr[s[0]]instanceof Boolean||(Modernizr[s[0]]=new Boolean(Modernizr[s[0]])),Modernizr[s[0]][s[1]]=r),u.push((r?"":"no-")+s.join("-"))}}function a(e){var t=m.className,n=Modernizr._config.classPrefix||"";if(h&&(t=t.baseVal),Modernizr._config.enableJSClass){var o=new RegExp("(^|\\s)"+n+"no-js(\\s|$)");t=t.replace(o,"$1"+n+"js$2")}Modernizr._config.enableClasses&&(t+=" "+n+e.join(" "+n),h?m.className.baseVal=t:m.className=t)}function i(){return"function"!=typeof t.createElement?t.createElement(arguments[0]):h?t.createElementNS.call(t,"http://www.w3.org/2000/svg",arguments[0]):t.createElement.apply(t,arguments)}function s(e,t){if("object"==typeof e)for(var n in e)v(e,n)&&s(n,e[n]);else{e=e.toLowerCase();var o=e.split("."),r=Modernizr[o[0]];if(2==o.length&&(r=r[o[1]]),"undefined"!=typeof r)return Modernizr;t="function"==typeof t?t():t,1==o.length?Modernizr[o[0]]=t:(!Modernizr[o[0]]||Modernizr[o[0]]instanceof Boolean||(Modernizr[o[0]]=new Boolean(Modernizr[o[0]])),Modernizr[o[0]][o[1]]=t),a([(t&&0!=t?"":"no-")+o.join("-")]),Modernizr._trigger(e,t)}return Modernizr}function l(){var e=t.body;return e||(e=i(h?"svg":"body"),e.fake=!0),e}function c(e,n,o,r){var a,s,c,u,d="modernizr",f=i("div"),h=l();if(parseInt(o,10))for(;o--;)c=i("div"),c.id=r?r[o]:d+(o+1),f.appendChild(c);return a=i("style"),a.type="text/css",a.id="s"+d,(h.fake?h:f).appendChild(a),h.appendChild(f),a.styleSheet?a.styleSheet.cssText=e:a.appendChild(t.createTextNode(e)),f.id=d,h.fake&&(h.style.background="",h.style.overflow="hidden",u=m.style.overflow,m.style.overflow="hidden",m.appendChild(h)),s=n(f,e),h.fake?(h.parentNode.removeChild(h),m.style.overflow=u,m.offsetHeight):f.parentNode.removeChild(f),!!s}var u=[],d=[],f={_version:"3.2.0",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,t){var n=this;setTimeout(function(){t(n[e])},0)},addTest:function(e,t,n){d.push({name:e,fn:t,options:n})},addAsyncTest:function(e){d.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=f,Modernizr=new Modernizr,Modernizr.addTest("svg",!!t.createElementNS&&!!t.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect),Modernizr.addTest("svgfilters",function(){var t=!1;try{t="SVGFEColorMatrixElement"in e&&2==SVGFEColorMatrixElement.SVG_FECOLORMATRIX_TYPE_SATURATE}catch(n){}return t});var m=t.documentElement,h="svg"===m.nodeName.toLowerCase();h||!function(e,t){function n(e,t){var n=e.createElement("p"),o=e.getElementsByTagName("head")[0]||e.documentElement;return n.innerHTML="x<style>"+t+"</style>",o.insertBefore(n.lastChild,o.firstChild)}function o(){var e=w.elements;return"string"==typeof e?e.split(" "):e}function r(e,t){var n=w.elements;"string"!=typeof n&&(n=n.join(" ")),"string"!=typeof e&&(e=e.join(" ")),w.elements=n+" "+e,c(t)}function a(e){var t=y[e[v]];return t||(t={},g++,e[v]=g,y[g]=t),t}function i(e,n,o){if(n||(n=t),d)return n.createElement(e);o||(o=a(n));var r;return r=o.cache[e]?o.cache[e].cloneNode():p.test(e)?(o.cache[e]=o.createElem(e)).cloneNode():o.createElem(e),!r.canHaveChildren||h.test(e)||r.tagUrn?r:o.frag.appendChild(r)}function s(e,n){if(e||(e=t),d)return e.createDocumentFragment();n=n||a(e);for(var r=n.frag.cloneNode(),i=0,s=o(),l=s.length;l>i;i++)r.createElement(s[i]);return r}function l(e,t){t.cache||(t.cache={},t.createElem=e.createElement,t.createFrag=e.createDocumentFragment,t.frag=t.createFrag()),e.createElement=function(n){return w.shivMethods?i(n,e,t):t.createElem(n)},e.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+o().join().replace(/[\w\-:]+/g,function(e){return t.createElem(e),t.frag.createElement(e),'c("'+e+'")'})+");return n}")(w,t.frag)}function c(e){e||(e=t);var o=a(e);return!w.shivCSS||u||o.hasCSS||(o.hasCSS=!!n(e,"article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),d||l(e,o),e}var u,d,f="3.7.3",m=e.html5||{},h=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,p=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,v="_html5shiv",g=0,y={};!function(){try{var e=t.createElement("a");e.innerHTML="<xyz></xyz>",u="hidden"in e,d=1==e.childNodes.length||function(){t.createElement("a");var e=t.createDocumentFragment();return"undefined"==typeof e.cloneNode||"undefined"==typeof e.createDocumentFragment||"undefined"==typeof e.createElement}()}catch(n){u=!0,d=!0}}();var w={elements:m.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output picture progress section summary template time video",version:f,shivCSS:m.shivCSS!==!1,supportsUnknownElements:d,shivMethods:m.shivMethods!==!1,type:"default",shivDocument:c,createElement:i,createDocumentFragment:s,addElements:r};e.html5=w,c(t),"object"==typeof module&&module.exports&&(module.exports=w)}("undefined"!=typeof e?e:this,t);var p=f._config.usePrefixes?" -webkit- -moz- -o- -ms- ".split(" "):[];f._prefixes=p,Modernizr.addTest("inlinesvg",function(){var e=i("div");return e.innerHTML="<svg/>","http://www.w3.org/2000/svg"==("undefined"!=typeof SVGRect&&e.firstChild&&e.firstChild.namespaceURI)}),Modernizr.addTest("csspointerevents",function(){var e=i("a").style;return e.cssText="pointer-events:auto","auto"===e.pointerEvents});var v;!function(){var e={}.hasOwnProperty;v=o(e,"undefined")||o(e.call,"undefined")?function(e,t){return t in e&&o(e.constructor.prototype[t],"undefined")}:function(t,n){return e.call(t,n)}}(),f._l={},f.on=function(e,t){this._l[e]||(this._l[e]=[]),this._l[e].push(t),Modernizr.hasOwnProperty(e)&&setTimeout(function(){Modernizr._trigger(e,Modernizr[e])},0)},f._trigger=function(e,t){if(this._l[e]){var n=this._l[e];setTimeout(function(){var e,o;for(e=0;e<n.length;e++)(o=n[e])(t)},0),delete this._l[e]}},Modernizr._q.push(function(){f.addTest=s}),Modernizr.addTest("svgasimg",t.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image","1.1"));var g=f.testStyles=c;Modernizr.addTest("hiddenscroll",function(){return g("#modernizr {width:100px;height:100px;overflow:scroll}",function(e){return e.offsetWidth===e.clientWidth})}),Modernizr.addTest("touchevents",function(){var n;if("ontouchstart"in e||e.DocumentTouch&&t instanceof DocumentTouch)n=!0;else{var o=["@media (",p.join("touch-enabled),("),"heartz",")","{#modernizr{top:9px;position:absolute}}"].join("");g(o,function(e){n=9===e.offsetTop})}return n});var y=function(){var t=e.matchMedia||e.msMatchMedia;return t?function(e){var n=t(e);return n&&n.matches||!1}:function(t){var n=!1;return c("@media "+t+" { #modernizr { position: absolute; } }",function(t){n="absolute"==(e.getComputedStyle?e.getComputedStyle(t,null):t.currentStyle).position}),n}}();f.mq=y,Modernizr.addTest("mediaqueries",y("only all")),r(),a(u),delete f.addTest,delete f.addAsyncTest;for(var w=0;w<Modernizr._q.length;w++)Modernizr._q[w]();e.Modernizr=Modernizr}(window,document);

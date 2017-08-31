/*! rule-visualization.js by oldj */
!function(t){function e(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,e),i.l=!0,i.exports}var n={};e.m=t,e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:r})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=5)}([function(module,exports,__webpack_require__){"use strict";function toStr(t,e,n){t=t.slice(0);var r=t.shift();t=t.map(function(t){var r=t.startsWith("!");r&&(t=t.replace(/^!/g,""));var i=void 0;return i=t.startsWith("_")?n[t]:t.startsWith("r")?"("+toStr(e[t],e,n)+")":t,(i&&r?"!":"")+i});var i=t.filter(function(t){return!!t}).join(r);return i=add_brackets.checkAndAdd(i),i=removeUnnecessaryBrackets(i)}function toObj(t){function e(t){var e="";return t.indexOf("&")>-1?e="&":t.indexOf("|")>-1&&(e="|"),t=t.replace(/([&\|])/g," $1 ").replace(/[\(\)&\|]/g,"").replace(/^\s+|\s+$/g,"").replace(/\s+/g," ").split(" "),1===t.length&&(e="&"),e&&t.unshift(e),t}var n={},r=0,i={},o=0;t=t.replace(/\d+/g,function(t){var e="_"+r;return n[e]=t,r++,e});for(var s=100;s>0&&-1!=t.indexOf("(");)t=t.replace(/\([^\(\)]*?\)/g,function(t){var n="r"+o;return i[n]=e(t),o++,n}),s--;return t=e(t),{rules:t,r_dict:i,_dict:n}}function clean(my_rules){if(my_rules=(my_rules||"").replace(/！/g,"!").replace(/（/g,"(").replace(/）/g,")"),!(my_rules=my_rules.replace(/\!\s*/g,"!").replace(/\!\!/g,"").replace(/\(\s*(\!*\d+)\s*\)/g,"$1").replace(/\!*\s*\(\s*\)/g,"")))return"";if(!/[\d\!\(\)&\|\s]+/.test(my_rules))throw new Error("Syntax Error!");try{eval(my_rules)}catch(t){throw new Error("Syntax Error!")}return removeUnnecessaryBrackets(my_rules)}function removeUnnecessaryBrackets(t){for(var e=void 0,n=0;n<100&&(e=t.replace(/([&|\|])\s*\((\d+([&|\|])[^\(\)]+?)\)/g,function(t,e,n,r){return e==r?e+n:t}).replace(/\((\d+([&|\|])[^\(\)]+?)\)\s*([&|\|])/g,function(t,e,n,r){return n==r?e+n:t}))!=t;n++)t=e;return t}var add_brackets=__webpack_require__(1);exports.toStr=toStr,exports.toObj=toObj,exports.clean=clean,exports.removeUnnecessaryBrackets=removeUnnecessaryBrackets},function(t,e,n){"use strict";function r(t){function e(t){var e=t.split("|");return 1===e.length?t:e.map(function(t){return t.indexOf("&")>-1&&!/^\(.+\)$/.test(t)?"("+t+")":t}).join("|")}for(var n={},r=100,i=0;r>0&&-1!=t.indexOf("(");)t=t.replace(/\([^\(\)]*?\)/g,function(t){var r="r"+i;return n[r]=e(t),i++,r}),r--;t=e(t);for(var o=0;o<100&&t.match(/\br\d+/);o++)t=t.replace(/\br\d+/g,function(t){return n[t]});return t}e.checkAndAdd=r},,,,function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};e.addClass("rule-v-container"),t=s.clean(t),t=a.checkAndAdd(t);var r=s.toObj(t);t=r.rules;var o=r.r_dict,h=r._dict;"function"==typeof n&&(n={ready:n});var c=new u(null,t,o,h,n);return c.adjust(),c.each(function(t){return t.inout()}),c.render(e),$(e).on("click",".rule-v-btn",function(n){n.stopPropagation(),$(e).off();var r=$(this),a=r.parent().attr("data-a");r.hasClass("rule-v-btn-add-after")?h[a]="("+h[a]+"&0)":r.hasClass("rule-v-btn-add-before")?h[a]="(0&"+h[a]+")":r.hasClass("rule-v-btn-add-top")?h[a]="(0|"+h[a]+")":r.hasClass("rule-v-btn-add-bottom")?h[a]="("+h[a]+"|0)":r.hasClass("btn-remove")&&(h[a]=""),i(s.toStr(t,o,h),e)}),setTimeout(function(){"function"==typeof n.ready&&n.ready()},1),c}var o=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),s=n(0),a=n(1),u=n(6).Rule;n(7);var h=function(){function t(e,n,o){r(this,t),this.rules=e,this.element=$(n),this.obj=i(this.rules,this.element,o)}return o(t,[{key:"toStr",value:function(){return this.obj.toStr()}},{key:"highLight",value:function(t){Array.isArray(t)||(t=[t]),this.obj.highLight(t)}}]),t}();window.RuleVisualizer=h},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t){var e="";for(var n in t)t.hasOwnProperty(n)&&(e+=n+":"+t[n]+";");return e}function o(t,e,n,r,i,o,s,a){t.lineWidth=a||1,t.strokeStyle=s||"#b4b4b4",t.beginPath(),t.moveTo(e-.5,n-.5),o?(t.lineTo(r-.5,n-.5),t.lineTo(r-.5,i-.5)):(t.lineTo(e-.5,i-.5),t.lineTo(r-.5,i-.5)),t.stroke(),t.closePath()}var s=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),a=n(0),u=[10,20],h=60,c=30,l=[16,4],f=function(){function t(e,n,i,o){var s=arguments.length>4&&void 0!==arguments[4]?arguments[4]:{},a=arguments.length>5&&void 0!==arguments[5]?arguments[5]:u[0],f=arguments.length>6&&void 0!==arguments[6]?arguments[6]:u[1];r(this,t),this.is_not=/^\s*\!/.test(n),this._original_s=Array.isArray(n)?n.slice(0):n,this._a="string"==typeof n?n.replace(/^\s*\!/,""):n,this.parent=e,this.r_dict=i,this._dict=o,this.options=s,this.options.styles=s.styles||{},this.node_width=this.options.node_width||h,this.node_height=this.options.node_height||c,this.top=a-(e?e.top:0),this.left=f-(e?e.left:0),this.offset_x=0,this.children=[],this.width=0,this.height=0,this.el=null,this._cls="c"+(Array.isArray(this._a)?this._a.join("_"):this._a).replace(/[^\w]/g,"_"),this.parent&&this.parent.is_not&&(this.top+=l[1],this.left+=l[0]),Array.isArray(n)?(this.lg=n[0],this.s=n.slice(1)):(this.lg="",this.s=n.replace(/^\s*\!/,"")),this.calc()}return s(t,[{key:"calc",value:function(){var e=this,n=this.top,r=this.left;if(this.children=[],Array.isArray(this.s))this.s.map(function(i,o){var s=new t(e,i,e.r_dict,e._dict,e.options,n,r);e.children.push(s),"&"==e.lg?(e.width+=s.width+(o>0?u[1]:0)+2*s.offset_x,e.height=Math.max(e.height,s.height),r+=s.width+u[1]):(e.width=Math.max(e.width,s.width+2*s.offset_x),e.height+=s.height+(o>0?u[0]:0),n+=s.height+u[0])});else if(this.s.match(/^r/)){var i=void 0;i=new t(this,this.r_dict[this.s],this.r_dict,this._dict,this.options,this.top,this.left),this.children.push(i),this.width=i.width,this.height=i.height,this.is_not&&(this.left+=u[0],this.offset_x=u[0],this.width+=2*l[0],this.height+=2*l[1])}else this.width=this.node_width,this.height=this.node_height}},{key:"each",value:function(t){this.children.map(function(e){e.each(t),t(e)})}},{key:"getOffset",value:function(){for(var t=this.top,e=this.left,n=this.parent;n;)t+=n.top,e+=n.left,n=n.parent;return{top:t,left:e}}},{key:"inout",value:function(){var t=this.getOffset(),e=this.lg?Math.floor(u[1]/3):0;this.in_x=t.left-e,this.in_y=t.top+this.height/2,this.out_x=t.left+this.width+e,this.out_y=t.top+this.height/2,this.each(function(t){for(var e=t.parent;e;)e.in_x>t.in_x&&(e.in_x=t.in_x),e.out_x<t.out_x&&(e.out_x=t.out_x),e=e.parent})}},{key:"adjust",value:function(){if(this.children.map(function(t){return t.adjust()}),!this.parent||"&"!=this.parent.lg)return void this.inout();var t=this.parent.height,e=this.height;e<t&&(this.top+=(t-e)/2),this.inout()}},{key:"getPrev",value:function(){var t=this;if(!this.parent)return null;if("&"!==this.parent.lg)return this.parent;var e=this.parent.children,n=e.findIndex(function(e){return e==t});return 0===n?this.parent:e[n-1]}},{key:"getNext",value:function(){var t=this;if(!this.parent)return null;if("&"!==this.parent.lg)return this.parent;var e=this.parent.children,n=e.findIndex(function(e){return e==t});return n===e.length-1?this.parent:e[n+1]}},{key:"drawLines",value:function(t){this.children.map(function(e){e.drawLines(t)});var e=this.getPrev();e&&(e!=this.parent?o(t,e.out_x,e.out_y,this.in_x,this.in_y):o(t,e.in_x,e.in_y,this.in_x,this.in_y)),(e=this.getNext())&&(e!=this.parent?o(t,this.out_x,this.out_y,e.in_x,e.in_y,!0):o(t,this.out_x,this.out_y,e.out_x,e.out_y,!0))}},{key:"toStr",value:function(){var t=a.toStr(this._original_s,this.r_dict,this._dict);return t=t.replace(/&/g," & ").replace(/\|/g," | ")}},{key:"highLight",value:function(t){var e=this,n=[];for(var r in this._dict)!function(r){if(e._dict.hasOwnProperty(r)){var i=e._dict[r];t.map(function(t){t==i&&n.push(r)})}}(r);this.el&&($(this.el).find(".rule-v-node").removeClass("rule-v-hl"),n.map(function(t){$(e.el).find(".rule-v-node-"+t).addClass("rule-v-hl")}))}},{key:"render",value:function(t){this.el=t;var e=[],n={top:this.top+"px",left:this.left+"px",width:this.width+"px",height:this.height+"px"};if(e.push('<div class="rule '+this._cls+(this.is_not?" not":"")+'" style="'+i(n)+'" data-lg="'+this.lg+'" data-x="'+JSON.stringify({in_x:this.in_x,in_y:this.in_y,out_x:this.out_x,out_y:this.out_y}).replace(/"/g,"&quot;")+'">'),this.is_not&&e.push('<div class="rule-not" style="top:'+(this.height/2-7)+'px;">!</div>'),this.children.length>0)this.children.map(function(t){e.push(t.render())});else{var r=this._dict[this._a],s={width:this.node_width-2+"px;",height:this.node_height-2+"px;","line-height":this.node_height+"px;"},a=this.options.styles[r];a&&(s=Object.assign(s,a)),e.push('<div class="rule-v-node node'+(this.is_not?" not":"")+" rule-v-node-"+this._a+'" style="'+i(s)+'" data-a="'+this._a+'">'),e.push(r),e.push("</div>")}if(e.push("</div>"),t){var h=this.width+2*u[1],c=this.height+2*u[0];t.css({width:h,height:c}).html('<canvas width="'+h+'" height="'+c+'"></canvas>'+e.join(""));var l=t.find("canvas")[0],f=l.getContext("2d");this.drawLines(f),o(f,0,this.in_y,this.in_x,this.in_y),o(f,this.out_x,this.out_y,this.out_x+u[1],this.out_y)}return e.join("")}}]),t}();e.Rule=f},function(t,e,n){var r=n(8);"string"==typeof r&&(r=[[t.i,r,""]]);var i={};i.transform=void 0;n(10)(r,i);r.locals&&(t.exports=r.locals)},function(t,e,n){e=t.exports=n(9)(void 0),e.push([t.i,".rule-v-container {\n  position: relative;\n  background: #fff;\n  margin: 40px 0;\n  font-size: 12px;\n  line-height: 30px;\n}\n.rule-v-container .rule {\n  /*position: relative;*/\n  position: absolute;\n  z-index: 10;\n}\n.rule-v-container .rule.not {\n  outline: 1px solid #cbcbcb;\n  outline-offset: 5px;\n  background: rgba(0, 0, 0, 0.03);\n  box-shadow: 0 0 0 5px rgba(0, 0, 0, 0.03);\n}\n.rule-v-container .rule .rule-not {\n  position: absolute;\n  z-index: 15;\n  width: 14px;\n  height: 14px;\n  line-height: 14px;\n  font-size: 12px;\n  top: 5px;\n  left: -13px;\n  text-align: center;\n  background: #cbcbcb url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAABGdBTUEAALGPC/xhBQAAAFFJREFUSA1jYBgFQz0EGEn1wH8gQNbDCATIfEJsJkIKqC0/aiG1Q5RhNEhHg5TkEBj+iYbkIBnVMOhCgKS6DOT60fqQUBzSPeMTctCo/OAPAQDH5QgfRVAYjgAAAABJRU5ErkJggg==) no-repeat 50% 50%;\n  background-size: 14px 14px;\n  text-indent: -4em;\n  overflow: hidden;\n  color: #fff;\n  border-radius: 50%;\n}\n.rule-v-container .rule:hover.not {\n  outline-color: #a44f4e;\n  background-color: rgba(255, 0, 0, 0.1);\n  box-shadow: 0 0 0 5px rgba(255, 0, 0, 0.1);\n}\n.rule-v-container .rule:hover > .rule-not {\n  background-color: #a44f4e;\n}\n.rule-v-container .node {\n  border: solid 1px #cbcbcb;\n  /*padding: 0;*/\n  background: #fff;\n  min-width: 2em;\n  text-align: center;\n  line-height: 28px;\n  border-radius: 4px;\n}\n.rule-v-container .node:hover .rule-v-btn {\n  display: block;\n}\n.rule-v-container .node.rule-v-hl {\n  background: #bae9f6 !important;\n  border-color: #a7d2dd !important;\n}\n.rule-v-container canvas {\n  position: absolute;\n  z-index: 0;\n  top: 0;\n  left: 0;\n}\n.rule-v-container .rule-v-btn {\n  display: none;\n  position: absolute;\n  z-index: 20;\n  top: 10px;\n  background: #00c;\n  color: #fff;\n  text-align: center;\n  height: 10px;\n  width: 10px;\n  line-height: 10px;\n  border-radius: 50%;\n  cursor: pointer;\n}\n.rule-v-container .rule-v-btn.rule-v-btn-add-before {\n  left: -4px;\n}\n.rule-v-container .rule-v-btn.rule-v-btn-add-after {\n  right: -4px;\n}\n.rule-v-container .rule-v-btn.rule-v-btn-add-top {\n  top: -4px;\n  left: 25px;\n}\n.rule-v-container .rule-v-btn.rule-v-btn-add-bottom {\n  top: 24px;\n  left: 25px;\n}\n.rule-v-container .rule-v-btn.btn-remove {\n  background: #f00;\n  top: -4px;\n  right: -4px;\n}\n",""])},function(t,e,n){"use strict";function r(t,e){var n=t[1]||"",r=t[3];if(!r)return n;if(e&&"function"==typeof btoa){var o=i(r);return[n].concat(r.sources.map(function(t){return"/*# sourceURL="+r.sourceRoot+t+" */"})).concat([o]).join("\n")}return[n].join("\n")}function i(t){return"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(t))))+" */"}t.exports=function(t){var e=[];return e.toString=function(){return this.map(function(e){var n=r(e,t);return e[2]?"@media "+e[2]+"{"+n+"}":n}).join("")},e.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]]);for(var r={},i=0;i<this.length;i++){var o=this[i][0];"number"==typeof o&&(r[o]=!0)}for(i=0;i<t.length;i++){var s=t[i];"number"==typeof s[0]&&r[s[0]]||(n&&!s[2]?s[2]=n:n&&(s[2]="("+s[2]+") and ("+n+")"),e.push(s))}},e}},function(t,e,n){function r(t,e){for(var n=0;n<t.length;n++){var r=t[n],i=p[r.id];if(i){i.refs++;for(var o=0;o<i.parts.length;o++)i.parts[o](r.parts[o]);for(;o<r.parts.length;o++)i.parts.push(c(r.parts[o],e))}else{for(var s=[],o=0;o<r.parts.length;o++)s.push(c(r.parts[o],e));p[r.id]={id:r.id,refs:1,parts:s}}}}function i(t,e){for(var n=[],r={},i=0;i<t.length;i++){var o=t[i],s=e.base?o[0]+e.base:o[0],a=o[1],u=o[2],h=o[3],c={css:a,media:u,sourceMap:h};r[s]?r[s].parts.push(c):n.push(r[s]={id:s,parts:[c]})}return n}function o(t,e){var n=g(t.insertInto);if(!n)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var r=y[y.length-1];if("top"===t.insertAt)r?r.nextSibling?n.insertBefore(e,r.nextSibling):n.appendChild(e):n.insertBefore(e,n.firstChild),y.push(e);else{if("bottom"!==t.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");n.appendChild(e)}}function s(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t);var e=y.indexOf(t);e>=0&&y.splice(e,1)}function a(t){var e=document.createElement("style");return t.attrs.type="text/css",h(e,t.attrs),o(t,e),e}function u(t){var e=document.createElement("link");return t.attrs.type="text/css",t.attrs.rel="stylesheet",h(e,t.attrs),o(t,e),e}function h(t,e){Object.keys(e).forEach(function(n){t.setAttribute(n,e[n])})}function c(t,e){var n,r,i,o;if(e.transform&&t.css){if(!(o=e.transform(t.css)))return function(){};t.css=o}if(e.singleton){var h=x++;n=b||(b=a(e)),r=l.bind(null,n,h,!1),i=l.bind(null,n,h,!0)}else t.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=u(e),r=d.bind(null,n,e),i=function(){s(n),n.href&&URL.revokeObjectURL(n.href)}):(n=a(e),r=f.bind(null,n),i=function(){s(n)});return r(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;r(t=e)}else i()}}function l(t,e,n,r){var i=n?"":r.css;if(t.styleSheet)t.styleSheet.cssText=m(e,i);else{var o=document.createTextNode(i),s=t.childNodes;s[e]&&t.removeChild(s[e]),s.length?t.insertBefore(o,s[e]):t.appendChild(o)}}function f(t,e){var n=e.css,r=e.media;if(r&&t.setAttribute("media",r),t.styleSheet)t.styleSheet.cssText=n;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}function d(t,e,n){var r=n.css,i=n.sourceMap,o=void 0===e.convertToAbsoluteUrls&&i;(e.convertToAbsoluteUrls||o)&&(r=_(r)),i&&(r+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(i))))+" */");var s=new Blob([r],{type:"text/css"}),a=t.href;t.href=URL.createObjectURL(s),a&&URL.revokeObjectURL(a)}var p={},v=function(t){var e;return function(){return void 0===e&&(e=t.apply(this,arguments)),e}}(function(){return window&&document&&document.all&&!window.atob}),g=function(t){var e={};return function(n){return void 0===e[n]&&(e[n]=t.call(this,n)),e[n]}}(function(t){return document.querySelector(t)}),b=null,x=0,y=[],_=n(11);t.exports=function(t,e){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");e=e||{},e.attrs="object"==typeof e.attrs?e.attrs:{},e.singleton||(e.singleton=v()),e.insertInto||(e.insertInto="head"),e.insertAt||(e.insertAt="bottom");var n=i(t,e);return r(n,e),function(t){for(var o=[],s=0;s<n.length;s++){var a=n[s],u=p[a.id];u.refs--,o.push(u)}if(t){r(i(t,e),e)}for(var s=0;s<o.length;s++){var u=o[s];if(0===u.refs){for(var h=0;h<u.parts.length;h++)u.parts[h]();delete p[u.id]}}}};var m=function(){var t=[];return function(e,n){return t[e]=n,t.filter(Boolean).join("\n")}}()},function(t,e,n){"use strict";t.exports=function(t){var e="undefined"!=typeof window&&window.location;if(!e)throw new Error("fixUrls requires window.location");if(!t||"string"!=typeof t)return t;var n=e.protocol+"//"+e.host,r=n+e.pathname.replace(/\/[^\/]*$/,"/");return t.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(t,e){var i=e.trim().replace(/^"(.*)"$/,function(t,e){return e}).replace(/^'(.*)'$/,function(t,e){return e});if(/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(i))return t;var o;return o=0===i.indexOf("//")?i:0===i.indexOf("/")?n+i:r+i.replace(/^\.\//,""),"url("+JSON.stringify(o)+")"})}}]);
//# sourceMappingURL=rule-visualization.bundle.js.map
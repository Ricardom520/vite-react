!function(){function t(t,n){return function(t){if(Array.isArray(t))return t}(t)||function(t,r){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null==n)return;var e,o,a=[],i=!0,u=!1;try{for(n=n.call(t);!(i=(e=n.next()).done)&&(a.push(e.value),!r||a.length!==r);i=!0);}catch(c){u=!0,o=c}finally{try{i||null==n.return||n.return()}finally{if(u)throw o}}return a}(t,n)||function(t,n){if(!t)return;if("string"==typeof t)return r(t,n);var e=Object.prototype.toString.call(t).slice(8,-1);"Object"===e&&t.constructor&&(e=t.constructor.name);if("Map"===e||"Set"===e)return Array.from(t);if("Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e))return r(t,n)}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function r(t,r){(null==r||r>t.length)&&(r=t.length);for(var n=0,e=new Array(r);n<r;n++)e[n]=t[n];return e}System.register(["./react-legacy.d9df9729.js","./react-router-legacy.cc3ce7b4.js","./@remix-run-legacy.0d3b0054.js"],(function(r,n){"use strict";var e,o,a,i;return{setters:[function(t){e=t.r},function(t){o=t.j,a=t.R},function(t){i=t.c}],execute:function(){r("B",(
/**
       * React Router DOM v6.4.1
       *
       * Copyright (c) Remix Software Inc.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE.md file in the root directory of this source tree.
       *
       * @license MIT
       */
function(r){var n=r.basename,u=r.children,c=r.window,l=e.exports.useRef();null==l.current&&(l.current=i({window:c,v5Compat:!0}));var f=l.current,s=t(e.exports.useState({action:f.action,location:f.location}),2),y=s[0],d=s[1];return e.exports.useLayoutEffect((function(){return f.listen(d)}),[f]),o(a,{basename:n,children:u,location:y.location,navigationType:y.action,navigator:f})}))}}}))}();

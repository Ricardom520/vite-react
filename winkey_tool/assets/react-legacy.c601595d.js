System.register(["./axios-legacy.c0afb033.js"],(function(e,t){"use strict";var r;return{setters:[function(e){r=e.g}],execute:function(){function t(e,t){for(var r=function(){var r=t[n];if("string"!=typeof r&&!Array.isArray(r)){var o=function(t){if("default"!==t&&!(t in e)){var n=Object.getOwnPropertyDescriptor(r,t);n&&Object.defineProperty(e,t,n.get?n:{enumerable:!0,get:function(){return r[t]}})}};for(var u in r)o(u)}},n=0;n<t.length;n++)r();return Object.freeze(Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}))}var n=e("r",{exports:{}}),o={},u=Symbol.for("react.element"),a=Symbol.for("react.portal"),c=Symbol.for("react.fragment"),f=Symbol.for("react.strict_mode"),i=Symbol.for("react.profiler"),s=Symbol.for("react.provider"),l=Symbol.for("react.context"),p=Symbol.for("react.forward_ref"),y=Symbol.for("react.suspense"),d=Symbol.for("react.memo"),_=Symbol.for("react.lazy"),v=Symbol.iterator,b={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},m=Object.assign,h={};function S(e,t,r){this.props=e,this.context=t,this.refs=h,this.updater=r||b}function E(){}function g(e,t,r){this.props=e,this.context=t,this.refs=h,this.updater=r||b}S.prototype.isReactComponent={},S.prototype.setState=function(e,t){if("object"!=typeof e&&"function"!=typeof e&&null!=e)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")},S.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},E.prototype=S.prototype;var R=g.prototype=new E;R.constructor=g,m(R,S.prototype),R.isPureReactComponent=!0;var w=Array.isArray,O=Object.prototype.hasOwnProperty,j={current:null},k={key:!0,ref:!0,__self:!0,__source:!0};function $(e,t,r){var n,o={},a=null,c=null;if(null!=t)for(n in void 0!==t.ref&&(c=t.ref),void 0!==t.key&&(a=""+t.key),t)O.call(t,n)&&!k.hasOwnProperty(n)&&(o[n]=t[n]);var f=arguments.length-2;if(1===f)o.children=r;else if(1<f){for(var i=Array(f),s=0;s<f;s++)i[s]=arguments[s+2];o.children=i}if(e&&e.defaultProps)for(n in f=e.defaultProps)void 0===o[n]&&(o[n]=f[n]);return{$$typeof:u,type:e,key:a,ref:c,props:o,_owner:j.current}}function x(e){return"object"==typeof e&&null!==e&&e.$$typeof===u}var C=/\/+/g;function P(e,t){return"object"==typeof e&&null!==e&&null!=e.key?function(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,(function(e){return t[e]}))}(""+e.key):t.toString(36)}function I(e,t,r,n,o){var c=typeof e;"undefined"!==c&&"boolean"!==c||(e=null);var f=!1;if(null===e)f=!0;else switch(c){case"string":case"number":f=!0;break;case"object":switch(e.$$typeof){case u:case a:f=!0}}if(f)return o=o(f=e),e=""===n?"."+P(f,0):n,w(o)?(r="",null!=e&&(r=e.replace(C,"$&/")+"/"),I(o,t,r,"",(function(e){return e}))):null!=o&&(x(o)&&(o=function(e,t){return{$$typeof:u,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}(o,r+(!o.key||f&&f.key===o.key?"":(""+o.key).replace(C,"$&/")+"/")+e)),t.push(o)),1;if(f=0,n=""===n?".":n+":",w(e))for(var i=0;i<e.length;i++){var s=n+P(c=e[i],i);f+=I(c,t,r,s,o)}else if(s=function(e){return null===e||"object"!=typeof e?null:"function"==typeof(e=v&&e[v]||e["@@iterator"])?e:null}(e),"function"==typeof s)for(e=s.call(e),i=0;!(c=e.next()).done;)f+=I(c=c.value,t,r,s=n+P(c,i++),o);else if("object"===c)throw t=String(e),Error("Objects are not valid as a React child (found: "+("[object Object]"===t?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return f}function T(e,t,r){if(null==e)return e;var n=[],o=0;return I(e,n,"","",(function(e){return t.call(r,e,o++)})),n}function A(e){if(-1===e._status){var t=e._result;(t=t()).then((function(t){0!==e._status&&-1!==e._status||(e._status=1,e._result=t)}),(function(t){0!==e._status&&-1!==e._status||(e._status=2,e._result=t)})),-1===e._status&&(e._status=0,e._result=t)}if(1===e._status)return e._result.default;throw e._result}var D={current:null},L={transition:null},U={ReactCurrentDispatcher:D,ReactCurrentBatchConfig:L,ReactCurrentOwner:j};o.Children={map:T,forEach:function(e,t,r){T(e,(function(){t.apply(this,arguments)}),r)},count:function(e){var t=0;return T(e,(function(){t++})),t},toArray:function(e){return T(e,(function(e){return e}))||[]},only:function(e){if(!x(e))throw Error("React.Children.only expected to receive a single React element child.");return e}},o.Component=S,o.Fragment=c,o.Profiler=i,o.PureComponent=g,o.StrictMode=f,o.Suspense=y,o.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=U,o.cloneElement=function(e,t,r){if(null==e)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var n=m({},e.props),o=e.key,a=e.ref,c=e._owner;if(null!=t){if(void 0!==t.ref&&(a=t.ref,c=j.current),void 0!==t.key&&(o=""+t.key),e.type&&e.type.defaultProps)var f=e.type.defaultProps;for(i in t)O.call(t,i)&&!k.hasOwnProperty(i)&&(n[i]=void 0===t[i]&&void 0!==f?f[i]:t[i])}var i=arguments.length-2;if(1===i)n.children=r;else if(1<i){f=Array(i);for(var s=0;s<i;s++)f[s]=arguments[s+2];n.children=f}return{$$typeof:u,type:e.type,key:o,ref:a,props:n,_owner:c}},o.createContext=function(e){return(e={$$typeof:l,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null}).Provider={$$typeof:s,_context:e},e.Consumer=e},o.createElement=$,o.createFactory=function(e){var t=$.bind(null,e);return t.type=e,t},o.createRef=function(){return{current:null}},o.forwardRef=function(e){return{$$typeof:p,render:e}},o.isValidElement=x,o.lazy=function(e){return{$$typeof:_,_payload:{_status:-1,_result:e},_init:A}},o.memo=function(e,t){return{$$typeof:d,type:e,compare:void 0===t?null:t}},o.startTransition=function(e){var t=L.transition;L.transition={};try{e()}finally{L.transition=t}},o.unstable_act=function(){throw Error("act(...) is not supported in production builds of React.")},o.useCallback=function(e,t){return D.current.useCallback(e,t)},o.useContext=function(e){return D.current.useContext(e)},o.useDebugValue=function(){},o.useDeferredValue=function(e){return D.current.useDeferredValue(e)},o.useEffect=function(e,t){return D.current.useEffect(e,t)},o.useId=function(){return D.current.useId()},o.useImperativeHandle=function(e,t,r){return D.current.useImperativeHandle(e,t,r)},o.useInsertionEffect=function(e,t){return D.current.useInsertionEffect(e,t)},o.useLayoutEffect=function(e,t){return D.current.useLayoutEffect(e,t)},o.useMemo=function(e,t){return D.current.useMemo(e,t)},o.useReducer=function(e,t,r){return D.current.useReducer(e,t,r)},o.useRef=function(e){return D.current.useRef(e)},o.useState=function(e){return D.current.useState(e)},o.useSyncExternalStore=function(e,t,r){return D.current.useSyncExternalStore(e,t,r)},o.useTransition=function(){return D.current.useTransition()},o.version="18.2.0",function(e){e.exports=o}(n);var F=t({__proto__:null,default:e("a",r(n.exports))},[n.exports]);e("R",F);var N=e("j",{exports:{}}),V={},q=n.exports,M=Symbol.for("react.element"),z=Symbol.for("react.fragment"),B=Object.prototype.hasOwnProperty,H=q.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,W={key:!0,ref:!0,__self:!0,__source:!0};function Y(e,t,r){var n,o={},u=null,a=null;for(n in void 0!==r&&(u=""+r),void 0!==t.key&&(u=""+t.key),void 0!==t.ref&&(a=t.ref),t)B.call(t,n)&&!W.hasOwnProperty(n)&&(o[n]=t[n]);if(e&&e.defaultProps)for(n in t=e.defaultProps)void 0===o[n]&&(o[n]=t[n]);return{$$typeof:M,type:e,key:u,ref:a,props:o,_owner:H.current}}V.Fragment=z,V.jsx=Y,V.jsxs=Y,function(e){e.exports=V}(N)}}}));

!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("react")):"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.app=t(require("react")):e.app=t(e.React)}(self,(function(e){return function(){"use strict";var t={7843:function(t){t.exports=e}},r={};function n(e){var o=r[e];if(void 0!==o)return o.exports;var u=r[e]={exports:{}};return t[e](u,u.exports,n),u.exports}n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,{a:t}),t},n.d=function(e,t){for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var o={};return function(){n.r(o),n.d(o,{default:function(){return u}});var e=n(7843),t=n.n(e);var r=function(t){var r=(0,e.useRef)(t);r.current=(0,e.useMemo)((function(){return t}),[t]);var n=(0,e.useRef)();return n.current||(n.current=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return r.current.apply(this,e)}),n.current},u=(0,e.memo)((function(){var e=r((function(){var e;null===(e=wx)||void 0===e||e.showToast({title:"看到提示了吗？",icon:"none",duration:4e3})}));return t().createElement("div",{style:{width:100,height:100,borderRadius:"100%",backgroundColor:"yellow",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"},onClick:e},"圆形~~")}))}(),o}()}));
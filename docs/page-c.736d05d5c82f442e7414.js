!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("react")):"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.app=t(require("react")):e.app=t(e.React)}(self,(function(e){return function(){"use strict";var t={9985:function(e,t,n){e.exports=n.p+"9d36ca7996400609b2a3.png"},7843:function(t){t.exports=e}},n={};function o(e){var r=n[e];if(void 0!==r)return r.exports;var u=n[e]={exports:{}};return t[e](u,u.exports,o),u.exports}o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,{a:t}),t},o.d=function(e,t){for(var n in t)o.o(t,n)&&!o.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.p="https://www.leeenx.cn/";var r={};return function(){o.r(r),o.d(r,{default:function(){return m}});var e=o(7843),t=o.n(e);var n=function(t){var n=(0,e.useRef)(t);n.current=(0,e.useMemo)((function(){return t}),[t]);var o=(0,e.useRef)();return o.current||(o.current=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return n.current.apply(this,e)}),o.current},u="undefined"!=typeof runingEnv?runingEnv:"web",i=function(){},a="wx_mp"===u?kbsHooks:{},c=(a.useLaunch,a.useError,a.usePageNotFound,a.useUnhandledRejection,a.useAppShow,a.useAppHide,a.useThemeChange,a.useLoad,a.useShow),s=void 0===c?i:c,f=(a.useReady,a.useHide),l=void 0===f?i:f,p=(a.useUnload,a.useRouteDone,a.usePullDownRefresh,a.useReachBottom,a.usePageScroll,a.useAddToFavorites,a.useShareAppMessage),d=void 0===p?i:p,v=(a.useShareTimeline,a.useResize,a.useTabItemTap,a.useSaveExitState,function(e){return"wx_mp"===u?t().createElement("wx-button",e):t().createElement("button",e)}),m=(0,e.memo)((function(){n((function(){var e;null===(e=navigate)||void 0===e||e("/page-b/",{pageTitle:"页面B"})}));var e=n((function(){var e;"wx_mp"===u?null===(e=wx)||void 0===e||e.navigateBack():history.back()}));return s((function(){console.log("page-c显示")})),l((function(){console.log("page-c隐藏")})),d((function(e){var t=e.from;return console.log("----from:",t),{title:"分享的页面是 PAGE-c"}})),t().createElement("div",{style:{display:"flex",flexDirection:"column",justifyContent:"flex-start",alignItems:"center",minHeight:"100vh",backgroundColor:"#efefef"}},t().createElement("img",{src:o(9985),style:{display:"block",width:100,height:100,margin:12}}),t().createElement(v,{onClick:e},"返回"))}))}(),r}()}));
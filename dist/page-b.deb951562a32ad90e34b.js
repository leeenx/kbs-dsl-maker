!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("react")):"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.app=t(require("react")):e.app=t(e.React)}(self,(function(e){return function(){"use strict";var t={985:function(e,t,n){e.exports=n.p+"9d36ca7996400609b2a3.png"},843:function(t){t.exports=e}},n={};function o(e){var r=n[e];if(void 0!==r)return r.exports;var u=n[e]={exports:{}};return t[e](u,u.exports,o),u.exports}o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,{a:t}),t},o.d=function(e,t){for(var n in t)o.o(t,n)&&!o.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.p="https://a.comtemarsh.com/kbs-dsl-maker/";var r={};return function(){o.r(r),o.d(r,{default:function(){return v}});var e=o(843),t=o.n(e);const n=function(t){var n=(0,e.useRef)(t);n.current=(0,e.useMemo)((function(){return t}),[t]);var o=(0,e.useRef)();return o.current||(o.current=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return n.current.apply(this,e)}),o.current};var u="undefined"!=typeof runingEnv?runingEnv:"web",i=function(){},a="wx_mp"===u?kbsHooks:{},c=(a.useLaunch,a.useError,a.usePageNotFound,a.useUnhandledRejection,a.useAppShow,a.useAppHide,a.useThemeChange,a.useLoad,a.useShow),s=void 0===c?i:c,l=(a.useReady,a.useHide),f=void 0===l?i:l,p=(a.useUnload,a.useRouteDone,a.usePullDownRefresh,a.useReachBottom,a.usePageScroll,a.useAddToFavorites,a.useShareAppMessage),d=void 0===p?i:p,m=(a.useShareTimeline,a.useResize,a.useTabItemTap,a.useSaveExitState,function(e){return"wx_mp"===u?t().createElement("wx-button",e):t().createElement("button",e)}),g=0;do{if(5==++g)break}while(g<10);console.log(g);const v=(0,e.memo)((function(){var r=n((function(){navigate("/page-a/",{pageTitle:"页面A"},{headless:!0})})),i=n((function(){"wx_mp"===u?wx.navigateBack():history.back()}));return s((function(){console.log("page-b显示")})),f((function(){console.log("page-b隐藏")})),d((function(e){var t=e.from;return console.log("----from:",t),{title:"分享的页面是 PAGE-B"}})),(0,e.useEffect)((function(){var e;"wx_mp"===u&&(null===(e=wx)||void 0===e||e.setNavigationBarTitle({title:"page-b"}))}),[]),t().createElement("div",{style:{display:"flex",flexDirection:"column",justifyContent:"flex-start",alignItems:"center",minHeight:"100vh",backgroundColor:"#efefef"}},t().createElement("img",{src:o(985),style:{display:"block",width:100,height:100,margin:12}}),t().createElement("div",{style:{fontSize:14,color:"#999",margin:12}},"带头部的页面窗口"),t().createElement(m,{onClick:r},"前往「page-a」"),t().createElement(m,{onClick:i,style:{margin:12}},"返回上一页"),t().createElement(m,{"open-type":"share",type:"primary",style:{fontWeight:400,fontSize:14}},"分享"))}))}(),r}()}));
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("react")):"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.app=t(require("react")):e.app=t(e.React)}(self,(function(e){return function(){"use strict";var t={1280:function(e,t,n){e.exports=n.p+"301ee23b1dce4dc5816c.png"},7843:function(t){t.exports=e}},n={};function o(e){var r=n[e];if(void 0!==r)return r.exports;var u=n[e]={exports:{}};return t[e](u,u.exports,o),u.exports}o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,{a:t}),t},o.d=function(e,t){for(var n in t)o.o(t,n)&&!o.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.p="https://www.leeenx.cn/";var r={};return function(){o.r(r),o.d(r,{default:function(){return m}});var e=o(7843),t=o.n(e);var n=function(t){var n=(0,e.useRef)(t);n.current=(0,e.useMemo)((function(){return t}),[t]);var o=(0,e.useRef)();return o.current||(o.current=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return n.current.apply(this,e)}),o.current},u="undefined"!=typeof runingEnv?runingEnv:"web",i=function(){},a="wx_mp"===u?kbsHooks:{},c=(a.useLaunch,a.useError,a.usePageNotFound,a.useUnhandledRejection,a.useAppShow,a.useAppHide,a.useThemeChange,a.useLoad,a.useShow),f=void 0===c?i:c,s=(a.useReady,a.useHide),l=void 0===s?i:s,p=(a.useUnload,a.useRouteDone,a.usePullDownRefresh,a.useReachBottom,a.usePageScroll,a.useAddToFavorites,a.useShareAppMessage),d=void 0===p?i:p,g=(a.useShareTimeline,a.useResize,a.useTabItemTap,a.useSaveExitState,function(e){return"wx_mp"===u?t().createElement("wx-button",e):t().createElement("button",e)}),m=(0,e.memo)((function(){var r=n((function(e){navigate("/page-c/",{pageTitle:"页面C"})})),i=n((function(){"wx_mp"===u?wx.navigateBack():history.back()})),a=n((function(e){console.log("=======>>>> handleGetUserInfo",e)}));return f((function(){console.log("page-a显示")})),l((function(){console.log("page-a隐藏")})),d((function(e){var t=e.from;return console.log("----from:",t),{title:"分享的页面是 PAGE-A"}})),(0,e.useEffect)((function(){var e;null===(e=wx)||void 0===e||e.setNavigationBarColor({frontColor:"#ffffff",backgroundColor:"#ffffff"})}),[]),t().createElement("div",{style:{backgroundColor:"#efefef",minHeight:"100vh",display:"flex",flexDirection:"column",justifyContent:"flex-start",alignItems:"center"}},t().createElement("div",{style:{position:"relative",width:"100vw",height:"calc(100vw * 0.5625)",paddingTop:88,boxSizing:"border-box"}},t().createElement("img",{src:o(1280),style:{position:"absolute",top:0,left:0,width:"100%",height:"100%"}})),t().createElement("div",{style:{fontSize:14,color:"#999",margin:12}},"自定义头部的页面"),t().createElement(g,{onClick:r,style:{marginTop:12}},"前往「page-c」"),t().createElement(g,{onClick:i,style:{marginTop:12}},"返回上一页"),t().createElement(g,{onGetUserInfo:a,"open-type":"getUserInfo",type:"primary",style:{marginTop:12}},"获取用户信息"),t().createElement(g,{"open-type":"chooseAvatar",type:"primary",style:{marginTop:12},onChooseAvatar:function(e){console.log("=====头像信息是：",e)}},"获取用户头像"))}))}(),r}()}));
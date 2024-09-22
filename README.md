# 简介

将 javascript 源码转译为 dsl 的脚手架。支持多页面构建与文件动态监听。支持 web 预览，目前建议在 web 端 + 小程序端同时开启预览，这样可以方便追踪问题，因为 dsl 渲染目前不支持 source map。


## 开发建议

尽量保证代码的简洁性，一些通用性的 npm 包请考虑在小程序端通过「registerGlobalScope」挂载上去，然后改成 externals 依赖。


## 不支持的功能

不要尝试加载 css，因为是面向小程序的页面。微信小程序目前不支持加载外部的 css，只在使用小程序包内的样式，或者是使用内联样式。


## 页面自带的勾子

- useLaunch: (callback: UseLaunchCallback) => void;
- useError: (callback: UseErrorCallback) => void;
- usePageNotFound: (callback: UsePageNotFoundCallback) => void;
- useUnhandledRejection: (callback: UseUnhandledRejectionCallback) => void;
- useAppShow: (callback: UseAppShowCallback) => void;
- useAppHide: (callback: UseAppHideCallback) => void;
- useThemeChange: (callback: UseThemeChangeCallback) => void;
- useLoad: (callback?: UseLoadCallback) => void;
- useShow: (callback?: UseShowCallback) => void;
- useReady: (callback?: UseReadyCallback) => void;
- useHide: (callback?: UseHideCallback) => void;
- useUnload: (callback?: UseUnloadCallback) => void;
- useRouteDone: (callback?: UseRouteDoneCallback) => void;
- usePullDownRefresh: (callback?: UsePullDownRefreshCallback) => void;
- useReachBottom: (callback?: UseReachBottomCallback) => void;
- usePageScroll: (callback?: UsePageScrollCallback) => void;
- useAddToFavorites: (callback?: UseAddToFavoritesCallback) => void;
- useShareAppMessage: (callback?: UseShareAppMessageCallback) => void;
- useShareTimeline: (callback?: UseShareTimelineCallback) => void;
- useResize: (callback?: UseResizeCallback) => void;
- useTabItemTap: (callback?: UseTabItemTapCallback) => void;
- useSaveExitState: (callback?: UseSaveExitStateCallback) => void;

## 内置方法

内置方法基本覆盖小程序 wxs 运行环境，例如以下四个：
- Page 即微信小程序环境的 Page
- App 即微信小程序环境的 App
- getApp 等同于 wx.getApp
- getCurrentPages 等同于 wx.getCurrentPages
- getThisPointer 获取当前页面的 this 指针

获取当前的 `this` 指针：`getThisPointer`，实际上是返回当前页面组件的 `this` 指针。因为 web 分包上的所谓组件并不是小程序组件，在调用某些需要当前组件指针的 api 时，可以调用此方法获取

## 内置对象

默认自带的内置对象如下：
- _: lodash对象
- wx: 即微信小程序的全局对象 wx
- runingEnv: 运行环境，web 表示 H5，小程序为 wx_mp

内置对象或内置方法，都可以通过 `kbs-dsl-resolver` 提供的 `registerToGlobleScope` 方法，把内置方法或对象注册到运行环境中。

```javascript
import { registerToGlobleScope } from 'kbs-dsl-resolver';
```

## web 分包的内置方法

- createRoute: (route: string, params: any, headless: boolean) => string; // 创建微信的页面路径，web分包在分享时可调用这个方法来生成 URL
- navigate: (route: string, params: any, config?: { replace: boolean; headless: boolean; }) => Promise<boolean>; 
- getParams: () => Record<string, any>; // // 返回小程序当前页面路径上的指定key 的 option
- getParam: (key: string) => string; // 返回小程序当前页面路径上的 options
- getCurrentPage: () => string; // 获取当前小程序的 page 路径

这些方法通常只存在于「web 分包」中，非页面级别的 sdk 包可能不存在（通过 `kbs-loader` 直接加载的 dsl）。

**navigate** 方法使用 route 不是小程序的页面路由，而是当前 web 路由，即开发者不需要关心 web 分包在宿主小程序下的路径。

## 不编译的后续

遇到 ** .3rd.js** 后缀的文件不编译，如果有第三方包（已经编译好的）可以考虑改用这个后缀。

## 多页面注意

如果分包下有多分页，请保证，所有的页面都有在分包下的 index.ts 中有导出。请参考：「packages/demo/」分包。


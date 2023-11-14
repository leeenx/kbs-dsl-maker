declare function navigate(route: string, params?: any, config?: { headless?: boolean; replace?: boolean; }): Promise<void>;
declare function getCurrentPage(): WechatMiniprogram.Page.Instance<WechatMiniprogram.IAnyObject, WechatMiniprogram.IAnyObject>;
declare function getParams(): Record<string, string | undefined>;
declare function getParam(key: string): string | undefined;
declare function getDslUrl(route: string): string;
declare function createWxMpRoute(route: string, params: any, headless: boolean): string;

/**
 * 以下是 APP 勾子
 */
type UseLaunchCallback = () => void;
type UseErrorCallback = (err: string) => void;
type UsePageNotFoundCallback = (res: {
  path: string;
  query: Object;
  isEntryPage: boolean;
}) => void;
type UseUnhandledRejectionCallback = (res: {
  reason: string;
  promise: Promise<any>
}) => void;
type UseAppShowCallback = (res: {
  path: string;
  scene: number;
  query: Object;
  shareTicket?: string;
  referrerInfo: {
    appId: string;
    extraData: Object;
  };
  forwardMaterials: {
    type: string;
    name: string;
    path: string;
    size: number;
  }[];
  chatType?: number; // 1 | 2 | 3 | 4;
  apiCategory?: string; // 'default' | 'nativeFunctionalized' | 'browseOnly' | 'embedded'
}) => void;
type UseAppHideCallback = () => void;
type UseThemeChangeCallback = (res: { theme: string }) => void;

/**
 * 以下是页面勾子
 */
type UseLoadCallback = (query: Object) => void;
type UseShowCallback = () => void;
type UseReadyCallback = () => void;
type UseHideCallback = () => void;
type UseUnloadCallback = () => void;
type UseRouteDoneCallback = () => void;
type UsePullDownRefreshCallback = () => void;
type UseReachBottomCallback = () => void;
type UsePageScrollCallback = (res: { scrollTop: number }) => void;
type UseAddToFavoritesCallback = (res: { webViewUrl: string }) => {
  title: string;
  imageUrl: string;
  query: string;
};
type UseShareAppMessageCallback = (res: {
  from: string;
  target: string;
  webViewUrl: string;
}) => {
  title?: string;
  path?: string;
  imageUrl?: string;
  promise?: Promise<{
    title?: string;
    path?: string;
    imageUrl?: string;
  }>
};
type UseShareTimelineCallback = () => {
  title?: string;
  query?: string;
  imageUrl?: string;
};
type UseResizeCallback = (res: {
  size: {
    windowWidth: number;
    windowHeight: number;
  }
}) => void;
type UseTabItemTapCallback = (res: {
  index: string;
  pagePath: string;
  text: string;
}) => void;
type UseSaveExitStateCallback = () => void;

declare namespace kbsHooks {
  function useLaunch(callback: UseLaunchCallback): void;
  function useError(callback: UseErrorCallback): void;
  function usePageNotFound(callback: UsePageNotFoundCallback): void;
  function useUnhandledRejection(callback: UseUnhandledRejectionCallback): void;
  function useAppShow(callback: UseAppShowCallback): void;
  function useAppHide(callback: UseAppHideCallback): void;
  function useThemeChange(callback: UseThemeChangeCallback): void;
  function useLoad(callback?: UseLoadCallback): void;
  function useShow(callback?: UseShowCallback): void;
  function useReady(callback?: UseReadyCallback): void;
  function useHide(callback?: UseHideCallback): void;
  function useUnload(callback?: UseUnloadCallback): void;
  function useRouteDone(callback?: UseRouteDoneCallback): void;
  function usePullDownRefresh(callback?: UsePullDownRefreshCallback): void;
  function useReachBottom(callback?: UseReachBottomCallback): void;
  function usePageScroll(callback?: UsePageScrollCallback): void;
  function useAddToFavorites(callback?: UseAddToFavoritesCallback): void;
  function useShareAppMessage(callback?: UseShareAppMessageCallback): void;
  function useShareTimeline(callback?: UseShareTimelineCallback): void;
  function useResize(callback?: UseResizeCallback): void;
  function useTabItemTap(callback?: UseTabItemTapCallback): void;
  function useSaveExitState(callback?: UseSaveExitStateCallback): void;
}

// 扩展 JSX
declare namespace JSX {
  interface IntrinsicElements {
    'wx-cover-image': any;
    'wx-cover-view': any;
    'wx-match-media': any;
    'wx-movable-area': any;
    'wx-movable-view': any;
    'wx-scroll-view': any;
    'wx-swiper': any;
    'wx-swiper-item': any;
    'wx-view': any;
    'wx-icon': any;
    'wx-progress': any;
    'wx-text': any;
    'wx-button': any;
    'wx-editor': any;
    'wx-form': any;
    'wx-picker': any;
    'wx-picker-view': any;
    'wx-picker-view-column': any;
    'wx-slider': any;
    'wx-switch': any;
    'wx-navigator': any;
    'wx-camera': any;
    'wx-image': any;
    'wx-live-player': any;
    'wx-live-pusher': any;
    'wx-voip-room': any;
    'wx-map': any;
    'wx-ad': any;
    'wx-official-account': any;
    'wx-open-data': any;
    'wx-web-view': any;
  }
}

declare const nameSpace: number;
declare const env: 'wechat-miniprogarm' | 'web';

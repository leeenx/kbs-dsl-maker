export const getEnv = () => {
  return typeof runingEnv !== 'undefined' ? runingEnv : 'web';
};

export const currentEnv = getEnv();

// 小程序的 hooks
const EMPTY_HOOK = () => {};
export const {
  useLaunch = EMPTY_HOOK,
  useError = EMPTY_HOOK,
  usePageNotFound = EMPTY_HOOK,
  useUnhandledRejection = EMPTY_HOOK,
  useAppShow = EMPTY_HOOK,
  useAppHide = EMPTY_HOOK,
  useThemeChange = EMPTY_HOOK,
  useLoad = EMPTY_HOOK,
  useShow = EMPTY_HOOK,
  useReady = EMPTY_HOOK,
  useHide = EMPTY_HOOK,
  useUnload = EMPTY_HOOK,
  useRouteDone = EMPTY_HOOK,
  usePullDownRefresh = EMPTY_HOOK,
  useReachBottom = EMPTY_HOOK,
  usePageScroll = EMPTY_HOOK,
  useAddToFavorites = EMPTY_HOOK,
  useShareAppMessage = EMPTY_HOOK,
  useShareTimeline = EMPTY_HOOK,
  useResize = EMPTY_HOOK,
  useTabItemTap = EMPTY_HOOK,
  useSaveExitState = EMPTY_HOOK
} = currentEnv === 'wx_mp' ? kbsHooks : {};

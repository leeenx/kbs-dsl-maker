import React, { memo } from "react";
import { useMemoizedFn } from "ahooks";

export default memo(() => {
  const handleClick = useMemoizedFn(() => {
    navigate('page-a', { pageTitle: '页面A' }, { headless: true });
  });
  return (<view onClick={handleClick}>page-b</view>);
});

import { useMemoizedFn } from "ahooks";
import React, { memo } from "react";

export default memo(() => {
  const handleClick = useMemoizedFn(() => {
    // @ts-ignore
    navigate('page-b', { pageTitle: '页面B' });
  });
  return (<view onClick={handleClick}>page-c</view>);
});

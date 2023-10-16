import { useMemoizedFn } from "ahooks";
import React, { memo } from "react";

export default memo(() => {
  const handleClick = useMemoizedFn(() => {
    navigate('page-c', { pageTitle: '页面A' });
  });
  return (<view style={{ paddingTop: 200, backgroundColor: 'green' }} onClick={handleClick}>page-a</view>);
});

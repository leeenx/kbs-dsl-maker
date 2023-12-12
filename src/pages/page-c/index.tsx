import { useMemoizedFn } from "ahooks";
import React, { memo } from "react";
import { useShow, useHide, useShareAppMessage, currentEnv } from '../../utils';
import { Button } from "../../base-components";

export default memo(() => {
  const handleClick = useMemoizedFn(() => {
    navigate?.('/page-b/', { pageTitle: '页面B' });
  });
  const handleBack = useMemoizedFn(() => {
    if (currentEnv === 'wx_mp') {
      wx?.navigateBack();
    } else {
      history.back();
    }
  });
  useShow(() => {
    console.log('page-c显示');
  });
  useHide(() => {
    console.log('page-c隐藏');
  });
  useShareAppMessage(({ from }) => {
    console.log('----from:', from);
    return {
      title: '分享的页面是 PAGE-c'
    }
  });
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#efefef'
    }}>
      <img
        src={require('../../images/dell_icon.png')}
        style={{
          display: 'block',
          width: 100,
          height: 100,
          margin: 12
        }}
      />
      <Button onClick={handleBack}>返回</Button>
    </div>
  );
});

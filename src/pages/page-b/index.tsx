import React, { memo, useEffect } from "react";
import { useMemoizedFn } from "ahooks";
import { useShow, useHide, useShareAppMessage, currentEnv } from '../../utils';
import { Button } from "../../base-components";

var i = 0;
do {
  if (++i === 5) {
    break;
  }
} while(i < 10);
console.log(i);

export default memo(() => {
  const handleClick = useMemoizedFn(() => {
    navigate('/page-a/', { pageTitle: '页面A' }, { headless: true });
  });
  const handleBack = useMemoizedFn(() => {
    if (currentEnv === 'wx_mp') {
      wx.navigateBack();
    } else {
      history.back();
    }
  });
  
  useShow(() => {
    console.log('page-b显示');
  });
  useHide(() => {
    console.log('page-b隐藏');
  });
  useShareAppMessage(({ from }) => {
    console.log('----from:', from);
    return {
      title: '分享的页面是 PAGE-B'
    }
  });

  useEffect(() => {
    if (currentEnv === 'wx_mp') {
      wx?.setNavigationBarTitle({ title: 'page-b' });
    }
  }, []);

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
    <div style={{ fontSize: 14, color: '#999', margin: 12 }}>
      带头部的页面窗口
    </div>
    <Button onClick={handleClick}>
      前往「page-a」
    </Button>
    <Button onClick={handleBack} style={{ margin: 12 }}>返回上一页</Button>
    <Button
      open-type="share"
      type="primary"
      style={{fontWeight: 400, fontSize: 14}}
    >分享</Button>
  </div>
  );
});

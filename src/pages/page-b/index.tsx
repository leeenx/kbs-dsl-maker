import React, { memo, useEffect } from "react";
import { useMemoizedFn } from "ahooks";

const { useShow, useHide, useShareAppMessage } = kbsHooks;

export default memo(() => {
  const handleClick = useMemoizedFn(() => {
    navigate('page-a/', { pageTitle: '页面A' }, { headless: true });
  });
  const handleBack = useMemoizedFn(() => {
    wx?.navigateBack();
  });
  
  useShow?.(() => {
    console.log('page-b显示');
  });
  useHide?.(() => {
    console.log('page-b隐藏');
  });
  useShareAppMessage?.(({ from }) => {
    console.log('----from:', from);
    return {
      title: '分享的页面是 PAGE-B'
    }
  });

  useEffect(() => {
    wx?.setNavigationBarTitle({ title: 'page-b' });
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
    <wx-button onClick={handleClick}>
      前往「page-a」
    </wx-button>
    <wx-button onClick={handleBack} style={{ margin: 12 }}>返回上一页</wx-button>
    <wx-button
      open-type="share"
      type="primary"
      style={{fontWeight: 400, fontSize: 14}}
    >分享</wx-button>
  </div>
  );
});

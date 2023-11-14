import { useMemoizedFn } from "ahooks";
import React, { memo, useEffect } from "react";
import { useShow, useHide, useShareAppMessage } from '../../utils';

export default memo(() => {
  const handleClick = useMemoizedFn((e) => {
    navigate('/page-c/', { pageTitle: '页面C' });
  });
  const handleBack = useMemoizedFn(() => {
    wx?.navigateBack();
  });
  const handleGetUserInfo = useMemoizedFn((e) => {
    console.log('=======>>>> handleGetUserInfo', e);
  });
  const handleChooseAvatar = (e) => {
    console.log('=====头像信息是：', e);
  };
  useShow(() => {
    console.log('page-a显示');
  });
  useHide(() => {
    console.log('page-a隐藏');
  });
  useShareAppMessage(({ from }) => {
    console.log('----from:', from);
    return {
      title: '分享的页面是 PAGE-A'
    }
  });
  useEffect(() => {
    wx?.setNavigationBarColor({ frontColor: '#ffffff', backgroundColor: '#ffffff' });
  }, []);
  return (
    <div style={{
      backgroundColor: '#efefef',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center'
    }}>
      <div style={{
        position: 'relative',
        width: '100vw',
        height: `calc(100vw * 0.5625)`,
        paddingTop: 88,
        boxSizing: 'border-box'
      }}>
        <img
          src={require('../../images/header.png')}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%'
          }}
        />
      </div>
      <div style={{ fontSize: 14, color: '#999', margin: 12 }}>
        自定义头部的页面
      </div>
      <wx-button onClick={handleClick} style={{ marginTop: 12 }}>
        前往「page-c」
      </wx-button>
      <wx-button onClick={handleBack} style={{ marginTop: 12 }}>返回上一页</wx-button>
      <wx-button
        onGetUserInfo={handleGetUserInfo}
        open-type="getUserInfo"
        type="primary"
        style={{ marginTop: 12 }}
      >获取用户信息</wx-button>
      <wx-button
        open-type="chooseAvatar"
        type="primary"
        style={{ marginTop: 12 }}
        onChooseAvatar={handleChooseAvatar}
      >获取用户头像</wx-button>
    </div>
  );
});

import React, { memo, useEffect } from "react";
import { useMemoizedFn } from "ahooks";
import { useShow, useHide, useShareAppMessage, currentEnv } from '../../utils';
import { Button } from "../../base-components";

const arr = [1, 2, 4];

function foo(value) {
  // const result = 0;
  // return value;
  // for(let i = 0; i < 1; ++i) {
  //   const j = i;
  // }
}

const obj = { $$a$$: 1 };

const start = Date.now();
let j = 0;
for(var i = 0; i <= 1000000; ++i) {
  // 1;
  // obj;
  obj.$$a$$;
  // ['$$a$$++'];
  // {$$a$$: 'is a' };
  // arr[0];
  // 1;
  // 1;
  // 1;
  // 1;
  // i;
  // if (i === 1000000) break;
}
console.log('~~总耗时：', Date.now() - start, { i, j });

export default memo(() => {
  const handleClick = useMemoizedFn(function handleClickFn() {
    navigate('/page-a/', { pageTitle: '页面A' }, { headless: true });
  });
  const handleBack = useMemoizedFn(function handleBackFn() {
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

const str = "xx-xx-xx";
const str2 = str.replace("0", "1")
.replace("1", "2")
.replace("2", "3")
.replace("3", "4")
.replace("4", "5")
.replace("5", "6")
.replace("6", "7")
.replace("7", "8")
.replace("8", "9")
.replace("9", "a")
.replace("a", "b")
.replace("b", "c")
.replace("c", "d")
.replace("d", "e")
.replace("e", "f")
.replace("f", "g")
.replace("g", "h")
.replace("h", "i")
.replace("i", "j");
// console.log('------', str2);

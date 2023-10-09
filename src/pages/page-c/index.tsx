import React, { memo, useEffect } from "react";

export default memo(() => {
  useEffect(() => {
    wx.setNavigationBarTitle({ title: 'page-c' });
  }, []);
  return (<view>page-c</view>);
});

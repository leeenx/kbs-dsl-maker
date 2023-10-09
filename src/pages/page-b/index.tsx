import React, { memo, useEffect } from "react";

export default memo(() => {
  useEffect(() => {
    wx.setNavigationBarTitle({ title: 'page-b' });
  }, []);
  return (<view>page-b</view>);
});

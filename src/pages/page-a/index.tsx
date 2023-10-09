import React, { memo, useEffect } from "react";

export default memo(() => {
  useEffect(() => {
    wx.setNavigationBarTitle({ title: 'page-a' });
  }, []);
  return (<view>page-a</view>);
});

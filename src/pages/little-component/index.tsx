import { useMemoizedFn } from "ahooks";
import React, { memo } from "react";

export default memo(() => {
  const handleClick = useMemoizedFn(() => {
    wx?.showToast({ title: '看到提示了吗？', icon: 'none', duration: 4000 })
  });
  return (
    <div
      style={{
        width: 100,
        height: 100,
        borderRadius: '100%',
        backgroundColor: 'yellow',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
      onClick={handleClick}
    >
      圆形
    </div>
  );
});

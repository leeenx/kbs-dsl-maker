import { useMemoizedFn } from "ahooks";
import React, { memo } from "react";

export default memo(() => {
  const handleClick = useMemoizedFn(() => {
    navigate('/demo', { page: 'page2' });
  });
  return (
    <div onClick={handleClick}>跳转到 page2</div>
  );
});

import React, { useCallback, useEffect } from 'react';
import { sayHello } from './utils/index';

const App = () => {
  const name = 'name';
  const obj = {
    [`a-${name}`]: 'name'
  };
  const handleClick = () => {
    console.log('你点了我');
  };
  useEffect(() => {
    sayHello();
    sayHello();
  }, []);
  useCallback(() => {}, []);
  return (
    <>
      <view>object: {obj[`a-${name}`]}ww@+@</view>
      <view>第二行</view>
      <view>第三行</view>
      <view style={{ backgroundColor: 'green' }}>第4行</view>
      <button onClick={handleClick}>授权</button>
    </>
  );
};

export default App;

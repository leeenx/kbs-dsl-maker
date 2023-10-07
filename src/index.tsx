import React, { useCallback, useEffect } from 'react';
import { sayHello } from './utils/index';

const App = () => {
  const name = 'name';
  const obj = {
    [`a-${name}`]: 'name'
  };
  useEffect(() => {
    sayHello();
    sayHello();
  }, []);
  useCallback(() => {}, []);
  return (
    <div className="xx-xx">{obj[`a-${name}`]}ww</div>
  );
};

export default App;

import React from 'react';
import './app.scss';
import './styles/reset.scss';
import './styles/base.scss';

const App: React.FC = () => {
  // 应用初始化逻辑
  React.useEffect(() => {
    // 初始化应用
    console.log('App initialized');
  }, []);

  return <div className="app">{/* 应用内容 */}</div>;
};

export default App;

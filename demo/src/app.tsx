import React, { PropsWithChildren } from 'react';
import 'taro-uno-ui/dist/style.css';
import './app.scss';

const App: React.FC<PropsWithChildren> = ({ children }) => {
  return <>{children}</>;
};

export default App;

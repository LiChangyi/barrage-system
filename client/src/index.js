import React, { createContext, useState } from 'react';
import ReactDom from 'react-dom';

// eslint-disable-next-line import/no-cycle
import App from './App';
import './scss/global.scss';
import { readUserInfo } from './util/tool';

const defaultUserInfo = readUserInfo();
export const UserInfoContext = createContext(defaultUserInfo);

const DOM = () => {
  const [userInfo, setUserInfo] = useState(defaultUserInfo);
  return (
    <UserInfoContext.Provider value={{ userInfo, setUserInfo }}>
      <App />
    </UserInfoContext.Provider>
  );
};

ReactDom.render(<DOM />, document.getElementById('root'));

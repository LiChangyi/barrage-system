import React, { useContext } from 'react';
import { message } from 'antd';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { hot } from 'react-hot-loader/root';

// eslint-disable-next-line import/no-cycle
import { UserInfoContext } from '.';
import routes from './routes';

const authMiddle = (Component, props, shouldAuth = false, userInfo = {}) => {
  const { token } = userInfo;

  if (!token && shouldAuth) {
    message.error('你还没有登录');
    return <Redirect to="/login" />;
  }

  return <Component {...props} />;
};

const App = () => {
  const { userInfo } = useContext(UserInfoContext);
  return (
    <Router>
      <Switch>
        {routes.map((route) => (
          <Route
            path={route.path}
            key={route.name}
            exact
            component={(props) => authMiddle(route.component, props, route.shouldAuth, userInfo)}
          />
        ))}
      </Switch>
    </Router>
  );
};

export default hot(App);

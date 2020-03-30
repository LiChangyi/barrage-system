import React from 'react';
import { message } from 'antd';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader/root';

import Layout from 'components/Layout';
import routes, { displayRoute } from './routes';

const authMiddle = (Component, props, shouldAuth = false, userInfo = {}) => {
  const { token } = userInfo;

  if (!token && shouldAuth) {
    message.error('你还没有登录');
    return <Redirect to="/user" />;
  }

  return <Component {...props} />;
};

const App = ({ user }) => (
  <Router>
    <Switch>
      <Route
        path={displayRoute.path}
        key={displayRoute.name}
        exact
        component={displayRoute.component}
      />
      <Layout>
        <Switch>
          {routes.map((route) => (
            <Route
              path={route.path}
              key={route.name}
              exact
              component={(props) => authMiddle(route.component, props, route.shouldAuth, user)}
            />
          ))}
        </Switch>
      </Layout>
    </Switch>
  </Router>
);

export default connect(
  (state) => ({ user: state.user.toJS() })
)(hot(App));

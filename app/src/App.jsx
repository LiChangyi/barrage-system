import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';

import Layout from 'components/Layout';

import routes, { displayRoute } from './routes';

const App = () => (
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
              component={route.component}
            />
          ))}
        </Switch>
      </Layout>
    </Switch>
  </Router>
);

export default hot(App);

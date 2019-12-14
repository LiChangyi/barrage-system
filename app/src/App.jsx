import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';

import Layout from 'components/Layout';

import routes from './routes';

const App = () => (
  <Router>
    <Layout>
      <Switch>
        {routes.map(route => (
          <Route
            path={route.path}
            key={route.name}
            exact
            component={route.component}
          />
        ))}
      </Switch>
    </Layout>
  </Router>
);

export default hot(App);

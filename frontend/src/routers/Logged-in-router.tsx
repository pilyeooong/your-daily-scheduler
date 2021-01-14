import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from '../pages/Home';
const commonRoutes = [
  {
    path: '/',
    component: <Home />,
  },
];
const LoggedInRouter = () => {
  return (
    <Router>
      <Switch>
        {commonRoutes.map((route) => (
          <Route key={route.path} exact path={route.path}>
            {route.component}
          </Route>
        ))}
      </Switch>
    </Router>
  );
};

export default LoggedInRouter;

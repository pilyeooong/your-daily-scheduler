import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from '../components/Header';
import Home from '../pages/Home';
import Profile from '../pages/Profile';

const commonRoutes = [
  {
    path: '/',
    component: <Home />,
  },
  {
    path: '/profile',
    component: <Profile />
  }
];

const LoggedInRouter = () => {
  return (
    <Router>
      <Header />
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

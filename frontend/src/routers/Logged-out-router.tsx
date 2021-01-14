import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from '../pages/Login';
import SignUp from '../pages/Signup';

const commonRoutes = [
  {
    path: '/',
    component: <Login />,
  },
  {
    path: '/signup',
    component: <SignUp />,
  },
];

const LoggedOutRouter = () => {
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

export default LoggedOutRouter;

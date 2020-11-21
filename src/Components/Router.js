import React from 'react';
import PropTypes from 'prop-types';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Auth from '../Routes/Auth/index';
import Feed from '../Routes/Feed';
import Explore from '../Routes/Explore';
import Search from '../Routes/Search';
import Profile from '../Routes/Profile';

const LoggedInRoutes = () => (
  <Switch>
    <Route exact path="/" component={Feed} />
    <Route exact path="/explore" component={Explore} />
    <Route exact path="/search" component={Search} />
    <Route exact path="/profile/:username" component={Profile} />
  </Switch>
);

const LoggedOutRoutes = () => (
  <Switch>
    <Route exact path="/" component={Auth} />
  </Switch>
);

const AppRouter = ({ isLoggedIn }) => (
  <Router>
    <Switch>{isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />}</Switch>
  </Router>
);

AppRouter.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default AppRouter;

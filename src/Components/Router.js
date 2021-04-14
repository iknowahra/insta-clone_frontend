import React from 'react';
import PropTypes from 'prop-types';
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Auth from '../Routes/Auth/index';
import Search from '../Routes/Result';
import Feed from '../Routes/Feed';
import Message from '../Routes/Message/index';
import Explore from '../Routes/Explore/index';
import Profile from '../Routes/Profile/index';

const LoggedInRoutes = () => (
  <Switch>
    <Route exact path="/" component={Feed} />
    <Route path="/explore" component={Explore} />
    <Route path="/message" component={Message} />
    <Route path="/search" component={Search} />
    <Route path="/profile/:username" component={Profile} />
    <Redirect from="*" to="/" />
  </Switch>
);

const LoggedOutRoutes = () => (
  <Switch>
    <Route exact path="/" component={Auth} />
    <Redirect from="*" to="/" />
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

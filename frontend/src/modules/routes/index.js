import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';

import { RouteURLs as Routes } from '../../constants';
import Login from '../auth/Login';
import Signup from '../auth/Signup';
import Header from '../../container/Header';
import Record from '../record/RecordList';

const routes = (props) => {
  const { isLoggedIn } = props;

  return (
    <>
      <Switch>
        <Route exact path={Routes.ROOT} render={() => {
          if (isLoggedIn) return <Redirect to={Routes.DASHBOARD} />;
          return <Redirect to={Routes.LOGIN} />;
        }} />
        <Route path={Routes.LOGIN} component={Login} />
        <Route path={Routes.SIGNUP} component={Signup} />
        <>
          <Header />
          <Switch>
            <Route path={Routes.DASHBOARD} component={() => <h1>Dashboard</h1>} />
            <Route path={Routes.PLANS} component={Record} />
          </Switch>
        </>
      </Switch>
    </>
  );
};

const mapStateToProps = (state) => ({
  isLoggedIn: !!state.getIn(['auth', 'me']),
});

export default connect(mapStateToProps, null)(routes);

import { Container } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { Route, Router, Switch } from 'react-router-dom';
import { userActions } from './_actions';
import { userConstants } from './_constants';
import { history } from './_helpers/history/history';
import { authInterceptor } from './_interceptors/auth/auth.interceptor';
import './App.scss';
import ForgotPasswordPage from './modules/Auth/ForgotPassword/ForgotPasswordPage';
import SignInPage from './modules/Auth/SignIn/SignInPage';
import HomePage from './modules/Home/HomePage';
import NotFoundPage from './modules/NotFound/NotFoundPage';
import PublicPage from './modules/Public/PublicPage';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  offset: theme.mixins.toolbar,
  hidden: {
    visibility: 'hidden',
  },
}));

function App() {
  const classes = useStyles();
  const currentUser = useSelector(state => state.user);
  const isFetchingDevice = useSelector(state => state.device && state.device.isFetchingDevice);
  const isLoggedIn = currentUser.isLoggedIn && currentUser.tokens !== null;
  const dispatch = useDispatch();
  const skipPath = ['/', '/signin'];
  const showProgress = skipPath.indexOf(history.location.pathname) < 0 && (currentUser.isFetching || isFetchingDevice);
  authInterceptor.interceptRequests();
  createAuthRefreshInterceptor(axios, authInterceptor.refreshAuthLogic(dispatch));

  const fetchMe = () => {
    if (isLoggedIn) {
      userActions
        .me()
        .then(response => {
          if (response && response.data) {
            dispatch({
              type: userConstants.GET_ME,
              payload: { ...response.data },
            });
          } else {
            dispatch(authInterceptor.disconnect());
          }
        })
        .catch(() => {
          dispatch(authInterceptor.disconnect());
        });
    }
  };

  useEffect(fetchMe, []);

  const PrivateRoute = ({ component: Component, authed, ...rest }) => {
    return (
      <Route
        {...rest}
        render={props =>
          authed === true ? (
            <Component {...props} />
          ) : (
            <Redirect to={{ pathname: '/signin', state: { from: props.location } }} />
          )
        }
      />
    );
  };

  return (
    <Container maxWidth={false} disableGutters={true} className={classes.root} data-test="appContainer">
      <div className={classes.offset} />
      <LinearProgress color="secondary" className={showProgress ? '' : classes.hidden} data-test="linearProgressComponent" />
      <Router history={history} data-test="routerComponent">
        <Switch data-test="switchComponent">
          <PrivateRoute authed={isLoggedIn} path="/home" component={HomePage} data-test="privateRouterPath" />
          <Route path="/signin" component={SignInPage} data-test="signInRouterPath" />
          <Route path="/forgot-password" component={ForgotPasswordPage} />
          <Route path="/" component={PublicPage} exact data-test="publicRouterPath" />
          <Route component={NotFoundPage} />
        </Switch>
      </Router>
    </Container>
  );
}

export default App;

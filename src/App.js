import { Container } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Router, Switch } from 'react-router-dom';
import { socketActions, userActions } from './_actions';
import Layout from './_components/route-layouts/layout/layout';
import { userConstants } from './_constants';
import { history } from './_helpers/history/history';
import { authInterceptor } from './_interceptors/auth/auth.interceptor';
import './App.scss';
import NotFoundPage from './modules/NotFound/NotFoundPage';

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
  const isAuthorized = currentUser.isAuthorized;
  const isAdmin = isLoggedIn && currentUser.role === 'admin';
  const token =
    currentUser && currentUser.tokens && currentUser.tokens.access && currentUser.tokens.access.token
      ? currentUser.tokens.access.token
      : null;
  const dispatch = useDispatch();
  const skipPath = ['/', '/signin'];
  const showProgress = skipPath.indexOf(history.location.pathname) < 0 && (currentUser.isFetching || isFetchingDevice);
  authInterceptor.interceptRequests();
  createAuthRefreshInterceptor(axios, authInterceptor.refreshAuthLogic(dispatch));

  useEffect(() => {
    const fetchMe = () => {
      if (isLoggedIn && !isAuthorized) {
        userActions
          .me()
          .then(response => {
            if (response && response.data) {
              dispatch({
                type: userConstants.GET_ME,
                payload: { ...response.data },
              });
              dispatch(socketActions.socketInit(token));
            } else {
              dispatch(authInterceptor.disconnect());
            }
          })
          .catch(() => {
            dispatch(authInterceptor.disconnect());
          });
      }
    };
    fetchMe();
  }, [token, dispatch, isLoggedIn, isAuthorized]);

  return (
    <Container maxWidth={false} disableGutters={true} className={classes.root} data-test="appContainer">
      <div className={classes.offset} />
      <LinearProgress color="secondary" className={showProgress ? '' : classes.hidden} data-test="linearProgressComponent" />
      <Router history={history} data-test="routerComponent">
        <Switch data-test="switchComponent">
          <Layout isAdmin={isAdmin} isLoggedIn={isLoggedIn} />
          <Route component={NotFoundPage} />
        </Switch>
      </Router>
    </Container>
  );
}

export default App;

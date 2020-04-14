import { Container } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { Route, Router, Switch } from 'react-router-dom';
import {
  userActions,
  deviceActions,
  deviceParamActions,
  deviceSettingActions,
  logActions,
  onlineDeviceActions,
  socketActions,
  subDeviceActions,
  subDeviceParamActions,
  subDeviceSettingActions,
} from './_actions';
import { sharedDeviceActions } from './_actions/shared-device/sharedDevice.actions';
import { userConstants } from './_constants';
import { history } from './_helpers/history';
import { userService } from './_services';
import './App.scss';
import config from './config';
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

  const disconnect = () => {
    dispatch(userActions.signOut());
    dispatch(socketActions.socketDisconnect());
    dispatch(deviceActions.removeAllDevices());
    dispatch(sharedDeviceActions.removeAllSharedDevices());
    dispatch(subDeviceActions.removeAllSubDevices());
    dispatch(deviceParamActions.removeAllDeviceParams());
    dispatch(subDeviceParamActions.removeAllSubDeviceParams());
    dispatch(deviceSettingActions.removeAllSettings());
    dispatch(subDeviceSettingActions.removeAllSettings());
    dispatch(onlineDeviceActions.removeAllOnlineDevices());
    dispatch(logActions.removeAllLogs());
  };

  // Function that will be called to refresh authorization
  const refreshAuthLogic = failedRequest =>
    axios
      .post(
        `${config.apiUrl}/auth/refresh-tokens`,
        { refreshToken: userService.getRefreshToken() },
        { skipAuthRefresh: true }
      )
      .then(response => {
        userService.setNewTokens(response.data);
        dispatch(userActions.setUserTokens(response.data));
        // eslint-disable-next-line no-param-reassign
        failedRequest.response.config.headers.Authorization = `Bearer ${response.data.access.token}`;
        return Promise.resolve();
      })
      .catch(e => {
        disconnect();
        return Promise.reject(e);
      });

  if (isLoggedIn) {
    axios.interceptors.request.use(request => {
      request.headers.Authorization = `Bearer ${userService.getAccessToken()}`;
      return request;
    });
    createAuthRefreshInterceptor(axios, refreshAuthLogic);
  }

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
          }
        })
        .catch(() => {
          disconnect();
        });
    }
  };

  useEffect(fetchMe, []);

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (isLoggedIn === true ? <Component {...props} /> : <Redirect to="/signin" />)} />
  );

  return (
    <Container maxWidth={false} disableGutters={true} className={classes.root} data-test="appContainer">
      <div className={classes.offset} />
      <LinearProgress color="secondary" className={showProgress ? '' : classes.hidden} />
      <Router history={history} data-test="routerComponent">
        <Switch data-test="switchComponent">
          <Route path="/" component={PublicPage} exact data-test="publicRouterPath" />
          <Route path="/signin" component={SignInPage} />
          <Route path="/forgot-password" component={ForgotPasswordPage} />
          <PrivateRoute path="/home" component={HomePage} />
          <Route component={NotFoundPage} />
        </Switch>
      </Router>
    </Container>
  );
}

export default App;

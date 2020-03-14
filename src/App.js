import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { Route, Router, Switch } from 'react-router-dom';
import { actions } from './_actions';
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
}));

function App() {
  const classes = useStyles();
  let isLoggedIn;
  const dispatch = useDispatch();

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
        dispatch(actions.setUserTokens(response.data));
        // eslint-disable-next-line no-param-reassign
        failedRequest.response.config.headers.Authorization = `Bearer ${response.data.access.token}`;
        return Promise.resolve();
      })
      .catch(e => {
        dispatch({
          type: userConstants.SIGN_OUT,
        });
        userService.signOutService();
        isLoggedIn = false;
        history.push('/signin');
        return Promise.reject(e);
      });

  useSelector(state => {
    if (state && state.user.isLoggedIn && state.user.tokens !== null) {
      isLoggedIn = true;
      axios.interceptors.request.use(request => {
        request.headers.Authorization = `Bearer ${userService.getAccessToken()}`;
        return request;
      });
    } else {
      isLoggedIn = false;
    }
    createAuthRefreshInterceptor(axios, refreshAuthLogic);
  });

  const fetchMe = () => {
    if (isLoggedIn) {
      actions
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
          dispatch({
            type: userConstants.SIGN_OUT,
          });
        });
    }
  };

  useEffect(fetchMe, []);

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (isLoggedIn === true ? <Component {...props} /> : <Redirect to="/signin" />)} />
  );

  return (
    <Container maxWidth={false} disableGutters={true} className={classes.root} data-test="appContainer">
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

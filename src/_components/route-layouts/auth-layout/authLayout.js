import React from 'react';
import { Route } from 'react-router-dom';
import LazyLoader from '../../lazy-loader/LazyLoader';

const SignInPage = React.lazy(() => import('../../../modules/Auth/SignIn/SignInPage'));
const PublicPage = React.lazy(() => import('../../../modules/Public/PublicPage'));
const ForgotPasswordPage = React.lazy(() => import('../../../modules/Auth/ForgotPassword/ForgotPasswordPage'));

function AuthLayout() {
  const authLayoutPath = ['/signin', '/forgot-password', '/'];
  return (
    <React.Fragment>
      <Route path={authLayoutPath[0]} exact component={LazyLoader(SignInPage)} />
      <Route path={authLayoutPath[1]} exact component={LazyLoader(ForgotPasswordPage)} />
      <Route path={authLayoutPath[2]} exact component={LazyLoader(PublicPage)} />
    </React.Fragment>
  );
}

export default AuthLayout;

import React from 'react';
import { Route } from 'react-router-dom';
import ForgotPasswordPage from '../../../modules/Auth/ForgotPassword/ForgotPasswordPage';
import SignInPage from '../../../modules/Auth/SignIn/SignInPage';
import PublicPage from '../../../modules/Public/PublicPage';

function AuthLayout() {
  const authLayoutPath = ['/signin', '/forgot-password', '/'];
  return (
    <React.Fragment>
      <Route path={authLayoutPath[0]} exact component={SignInPage} />
      <Route path={authLayoutPath[1]} exact component={ForgotPasswordPage} />
      <Route path={authLayoutPath[2]} exact component={PublicPage} />
    </React.Fragment>
  );
}

export default AuthLayout;

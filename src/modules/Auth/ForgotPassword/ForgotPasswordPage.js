import PropTypes from 'prop-types';
import React, { useCallback, useContext, useEffect } from 'react';
import { UserContext } from '../../../_contexts/user/UserContext.provider';
import { history } from '../../../_helpers/history/history';

const ForgotPasswordPage = () => {
  const userContext = useContext(UserContext);
  const isLoggedIn = userContext.isLoggedIn;

  const navigateTo = path => {
    history.push(path);
  };

  const init = useCallback(() => {
    const navigateToHome = () => {
      if (isLoggedIn) {
        navigateTo('/home');
      }
    };

    navigateToHome();
  }, [isLoggedIn]);

  useEffect(() => {
    init();
  });

  return <div data-test="forgotPasswordPageContainer">Forgot Password Page Works</div>;
};

ForgotPasswordPage.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default ForgotPasswordPage;

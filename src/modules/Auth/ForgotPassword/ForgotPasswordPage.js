import PropTypes from 'prop-types';
import React from 'react';

const ForgotPasswordPage = () => {
  return <div data-test="forgotPasswordPageContainer">Forgot Password Page Works</div>;
};

ForgotPasswordPage.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default ForgotPasswordPage;

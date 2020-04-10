import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import React from 'react';
import { history } from '../../../_helpers/history';

const redirectToSignIn = () => {
  history.push('/signin');
};

const SignInButton = () => {
  return (
    <Button variant="contained" color="primary" onClick={redirectToSignIn} data-test="signInButton">
      Sign In
    </Button>
  );
};

SignInButton.propTypes = {
  'data-test': PropTypes.string.isRequired,
};

export default SignInButton;

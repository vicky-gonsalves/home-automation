import PropTypes from 'prop-types';

const ForgotPasswordPage = () => {
  return 'Forgot Password Page Works';
};

ForgotPasswordPage.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default ForgotPasswordPage;

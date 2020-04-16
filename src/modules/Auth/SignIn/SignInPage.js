import { CssBaseline, withStyles } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userActions } from '../../../_actions/user/user.actions';
import Footer from '../../../_components/footer/footer';
import SignInForm from '../../../_components/forms/signIn-form/SignInForm';
import Navbar from '../../../_components/navbar/navbar';
import { history } from '../../../_helpers/history/history';
import config from '../../../config';

const useStyles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
    alignItems: 'center',
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
});

export class SignInPage extends Component {
  // eslint-disable-next-line class-methods-use-this
  navigateToForgotPass() {
    history.push('/forgot-password');
  }

  componentDidUpdate() {
    this.isLoggedIn = this.props.isLoggedIn && this.props.tokens !== null;
    if (this.isLoggedIn) history.push('/home');
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <Navbar appName={config.appName} data-test="navbarComponent" />
        <Container component="main" maxWidth="xs" data-test="signInContainer">
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <div data-test="signInFormComponent">
              <SignInForm />
            </div>
            <Grid container>
              <Grid item xs>
                <Button color="primary" size="small" onClick={this.navigateToForgotPass} data-test="forgotPassword">
                  Forgot password?
                </Button>
              </Grid>
            </Grid>
          </div>
        </Container>
        {/* Footer */}
        <footer className={classes.footer}>
          <Footer appName={config.appName} data-test="footerComponent" />
        </footer>
        {/* End footer */}
      </React.Fragment>
    );
  }
}

SignInPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapState(state) {
  const { isLoggedIn, tokens } = state.user;
  return { isLoggedIn, tokens };
}

const actionCreators = {
  signIn: userActions.signIn,
};

SignInPage.propTypes = {
  classes: PropTypes.shape({
    paper: PropTypes.string.isRequired,
    main: PropTypes.string.isRequired,
    footer: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }),
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  tokens: PropTypes.object,
  signIn: PropTypes.func.isRequired,
};

const connectedSignInPage = connect(mapState, actionCreators)(SignInPage);

export default withStyles(useStyles)(connectedSignInPage);

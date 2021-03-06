import { CssBaseline } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { siteSettingActions } from '../../../_actions';
import { adminDrawerActions } from '../../../_actions/admin-drawer/adminDrawer.actions';
import SignInForm from '../../../_components/forms/signIn-form/SignInForm';
import { history } from '../../../_helpers/history/history';

const useStyles = makeStyles(theme => ({
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
}));

const SignInPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const adminDrawer = useSelector(state => state.adminDrawer);
  const siteSettings = useSelector(state => state.siteSetting);
  const currentUser = useSelector(state => state.user);
  const isLoggedIn = currentUser.isLoggedIn && currentUser.tokens !== null;

  const navigateTo = path => {
    history.push(path);
  };

  useEffect(() => {
    const navigateToHome = () => {
      if (isLoggedIn) {
        navigateTo('/home');
      }
    };
    const hideAdminDrawer = () => {
      if (adminDrawer.show) {
        dispatch(adminDrawerActions.hide());
      }
    };
    const hideBurger = () => {
      if (siteSettings && siteSettings.burger) {
        dispatch(siteSettingActions.hideBurger());
      }
    };
    hideBurger();
    hideAdminDrawer();
    navigateToHome();
  }, [dispatch, isLoggedIn, adminDrawer, siteSettings]);

  return (
    <React.Fragment>
      <CssBaseline />
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
              <Button color="primary" size="small" onClick={() => navigateTo('/forgot-password')} data-test="forgotPassword">
                Forgot password?
              </Button>
            </Grid>
          </Grid>
        </div>
      </Container>
    </React.Fragment>
  );
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
};

export default SignInPage;

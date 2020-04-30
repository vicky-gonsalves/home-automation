import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { siteSettingActions } from '../../_actions';
import { adminDrawerActions } from '../../_actions/admin-drawer/adminDrawer.actions';
import SignInButton from '../../_components/buttons/signIn-button/signInButton';
import { history } from '../../_helpers/history/history';
import config from '../../config';

const useStyles = makeStyles(theme => ({
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
  },
}));

const PublicPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [renderLayout, setRenderLayout] = useState(false);
  const adminDrawer = useSelector(state => state.adminDrawer);
  const siteSettings = useSelector(state => state.siteSetting);
  const currentUser = useSelector(state => state.user);
  const isLoggedIn = currentUser.isLoggedIn && currentUser.tokens !== null;

  const navigateTo = path => {
    history.push(path);
  };

  const init = useCallback(() => {
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

    /*Prevent from re-rendering*/
    if (!renderLayout) {
      setRenderLayout(true);
    }

    hideBurger();
    hideAdminDrawer();
    navigateToHome();
  }, [renderLayout, dispatch, isLoggedIn, adminDrawer, siteSettings]);

  useEffect(() => {
    init();
  }, [init]);

  const renderPublicLayout = () => {
    if (renderLayout) {
      return (
        <React.Fragment>
          <CssBaseline />
          <div data-test="publicPageContainer">
            <main className={classes.main}>
              <div className={classes.heroContent}>
                <Container maxWidth="sm">
                  <Typography
                    component="h1"
                    variant="h2"
                    align="center"
                    color="textPrimary"
                    gutterBottom
                    data-test="appName"
                  >
                    {config.appName}
                  </Typography>
                  <Typography variant="h6" align="center" color="textSecondary" paragraph data-test="message">
                    This is restricted site. If you have credentials please proceed with Sign In else please EXIT.
                  </Typography>
                  <div className={classes.heroButtons}>
                    <Grid container spacing={2} justify="center">
                      <Grid item>
                        <SignInButton data-test="signInButtonComponent" />
                      </Grid>
                    </Grid>
                  </div>
                </Container>
              </div>
            </main>
          </div>
        </React.Fragment>
      );
    }
    return null;
  };

  return renderPublicLayout();
};

PublicPage.propTypes = {
  classes: PropTypes.shape({
    main: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    heroContent: PropTypes.string.isRequired,
    heroButtons: PropTypes.string.isRequired,
    footer: PropTypes.string.isRequired,
  }),
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default PublicPage;

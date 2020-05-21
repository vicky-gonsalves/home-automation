import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useMemo } from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import Footer from './_components/footer';
import Navbar from './_components/navbar/navbar';
import Layout from './_components/route-layouts/layout/layout';
import SiteSettingContextProvider from './_contexts/site-setting/SiteSettingContext.provider';
import UserContextProvider from './_contexts/user/UserContext.provider';
import { history } from './_helpers/history/history';
import './App.scss';
import config from './config';
import NotFoundPage from './modules/NotFound/NotFoundPage';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  offset: theme.mixins.toolbar,
}));

function App() {
  const classes = useStyles();

  const renderApp = useMemo(() => {
    return (
      <React.Fragment>
        <Navbar appName={config.appName} showBurgerIcon={true} data-test="navbarComponent" />
        <Router history={history} data-test="routerComponent">
          <Switch data-test="switchComponent">
            <Layout />
            <Route component={NotFoundPage} />
          </Switch>
        </Router>
      </React.Fragment>
    );
  }, []);

  return (
    <Container maxWidth={false} disableGutters={true} className={classes.root} data-test="appContainer">
      <div className={classes.offset} />
      <SiteSettingContextProvider data-test="siteSettingContextProvider">
        <UserContextProvider data-test="userContextProvider">{renderApp}</UserContextProvider>
      </SiteSettingContextProvider>
      <Footer appName={config.appName} data-test="footerComponent" />
    </Container>
  );
}

export default App;

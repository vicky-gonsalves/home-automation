import { CssBaseline } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import AdminDrawer from '../../../../_components/admin-drawer/adminDrawer';
import Footer from '../../../../_components/footer';
import Navbar from '../../../../_components/navbar/navbar';
import UserList from '../../../../_components/user-list/userList';
import config from '../../../../config';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
  },
}));

const UserListPage = () => {
  const classes = useStyles();
  const currentUser = useSelector(state => state.user);
  const isConnected = useSelector(state => state.socket && state.socket.connected);
  const isLoggedIn = currentUser.isLoggedIn && currentUser.tokens !== null;

  return (
    <React.Fragment>
      <CssBaseline />
      <Navbar appName={config.appName} data-test="navbarComponent" />
      <AdminDrawer data-test="adminDrawerComponent" />
      <Container disableGutters={true} maxWidth="xl" data-test="userListPageContainer">
        <div className={classes.root}>
          <UserList isLoggedIn={isLoggedIn} isConnected={isConnected} />
        </div>
      </Container>
      <footer className={classes.footer}>
        <Footer appName={config.appName} data-test="footerComponent" />
      </footer>
    </React.Fragment>
  );
};

UserListPage.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
    footer: PropTypes.string.isRequired,
  }),
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default UserListPage;

import { CssBaseline, withStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import AdminDrawer from '../../../_components/admin-drawer/adminDrawer';
import Footer from '../../../_components/footer';
import Navbar from '../../../_components/navbar/navbar';
import config from '../../../config';

const useStyles = theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
  },
});

export class DashboardPage extends Component {
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <Navbar appName={config.appName} data-test="navbarComponent" />
        <AdminDrawer data-test="adminDrawerComponent" />
        <Container disableGutters={true} maxWidth="xl" data-test="dashboardPageContainer">
          <div className={classes.root}>Admin Page</div>
        </Container>
        <footer className={classes.footer}>
          <Footer appName={config.appName} data-test="footerComponent" />
        </footer>
      </React.Fragment>
    );
  }
}

DashboardPage.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
    footer: PropTypes.string.isRequired,
  }),
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

function mapState() {
  return {};
}

const actionCreators = {};

const connectedDashboardPage = connect(mapState, actionCreators)(DashboardPage);

export default withStyles(useStyles)(connectedDashboardPage);

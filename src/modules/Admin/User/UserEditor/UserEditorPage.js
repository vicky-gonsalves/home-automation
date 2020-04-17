import { CssBaseline, withStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import AdminDrawer from '../../../../_components/admin-drawer/adminDrawer';
import Footer from '../../../../_components/footer';
import Navbar from '../../../../_components/navbar/navbar';
import config from '../../../../config';

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

class UserEditorPage extends Component {
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <Navbar appName={config.appName} data-test="navbarComponent" />
        <AdminDrawer data-test="adminDrawerComponent" />
        <Container disableGutters={true} maxWidth="xl" data-test="userEditorPageContainer">
          <div className={classes.root}>UserEditor Page</div>
        </Container>
        <footer className={classes.footer}>
          <Footer appName={config.appName} data-test="footerComponent" />
        </footer>
      </React.Fragment>
    );
  }
}

function mapState() {
  return {};
}

const actionCreators = {};

UserEditorPage.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
    footer: PropTypes.string.isRequired,
  }),
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

const connectedUserEditorPage = connect(mapState, actionCreators)(UserEditorPage);

export default withStyles(useStyles)(connectedUserEditorPage);

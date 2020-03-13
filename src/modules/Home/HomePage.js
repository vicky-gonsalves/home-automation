import { CssBaseline, withStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions, socketActions } from '../../_actions';
import BedroomCard from '../../_components/cards/bedroom-card/BedroomCard';
import OutdoorLightCard from '../../_components/cards/outdoor-lights-card/OutdoorLightCard';
import TankCard from '../../_components/cards/tank-card/TankCard';
import Footer from '../../_components/footer';
import Navbar from '../../_components/navbar';
import config from '../../config';

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

export class HomePage extends Component {
  componentDidMount() {
    if (this.props.tokens && this.props.tokens.access && this.props.tokens.access.token) {
      this.props.socketInit(this.props.tokens.access.token);
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <Navbar appName={config.appName} data-test="navbarComponent" />
        <Container disableGutters={true} maxWidth="xl">
          <div className={classes.root}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={6} xl={4}>
                <TankCard />
              </Grid>
              <Grid item xs={12} sm={12} md={6} xl={4}>
                <OutdoorLightCard />
              </Grid>
              <Grid item xs={12} sm={12} md={6} xl={4}>
                <BedroomCard />
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

HomePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapState(state) {
  const { isLoggedIn, tokens } = state.user;
  const { isSocketFetching } = state.socket;
  return { isLoggedIn, tokens, isSocketFetching };
}

const actionCreators = {
  signOut: actions.signOut,
  signIn: actions.signIn,
  me: actions.me,
  socketInit: socketActions.socketInit,
};

const connectedHomePage = connect(mapState, actionCreators)(HomePage);

export default withStyles(useStyles)(connectedHomePage);

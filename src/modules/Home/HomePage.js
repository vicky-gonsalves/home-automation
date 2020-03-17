import { CssBaseline, withStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions, socketActions } from '../../_actions';
import { deviceActions } from '../../_actions/device.actions';
import SmartSwitchCard from '../../_components/cards/smart-switch-card/SmartSwitchCard';
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
    if (
      this.props.isAuthorized &&
      this.props.isLoggedIn &&
      this.props.tokens &&
      this.props.tokens.access &&
      this.props.tokens.access.token &&
      !this.props.connected
    ) {
      this.props.socketInit(this.props.tokens.access.token);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.connected !== this.props.connected) {
      if (this.props.connected) {
        this.props.myDevices();
      }
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
              {this.props.devices.map(device => (
                <Grid key={device.deviceId} item xs={12} sm={12} md={6} xl={4}>
                  {device.variant && device.variant === 'tank' && <TankCard deviceName={device.name} />}
                  {device.variant && device.variant === 'smartSwitch' && <SmartSwitchCard deviceName={device.name} />}
                </Grid>
              ))}
              {this.props.sharedDevices.map(device => (
                <Grid key={device.deviceId} item xs={12} sm={12} md={6} xl={4}>
                  {device.variant && device.variant === 'tank' && <TankCard deviceName={device.name} />}
                  {device.variant && device.variant === 'smartSwitch' && <SmartSwitchCard deviceName={device.name} />}
                </Grid>
              ))}
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
  const { isLoggedIn, tokens, isAuthorized } = state.user;
  const { isSocketFetching, connected } = state.socket;
  const { devices } = state.device;
  const { sharedDevices } = state.sharedDevice;
  return { isLoggedIn, tokens, isSocketFetching, isAuthorized, connected, devices, sharedDevices };
}

const actionCreators = {
  signOut: actions.signOut,
  signIn: actions.signIn,
  me: actions.me,
  socketInit: socketActions.socketInit,
  myDevices: deviceActions.myDevices,
  removeAllDevices: deviceActions.removeAllDevices,
};

const connectedHomePage = connect(mapState, actionCreators)(HomePage);

export default withStyles(useStyles)(connectedHomePage);

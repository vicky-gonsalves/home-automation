import AppBar from '@material-ui/core/AppBar/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import BrightnessAutoIcon from '@material-ui/icons/BrightnessAuto';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  actions,
  deviceActions,
  deviceParamActions,
  deviceSettingActions,
  logActions,
  onlineDeviceActions,
  socketActions,
  subDeviceActions,
  subDeviceParamActions,
  subDeviceSettingActions,
} from '../../_actions';
import { sharedDeviceActions } from '../../_actions/shared-device/sharedDevice.actions';

const useStyles = makeStyles(() => ({
  title: {
    flexGrow: 1,
  },
}));

export default function Navbar(props) {
  const currentUser = useSelector(state => state.user);
  const isLoggedIn = currentUser.isLoggedIn && currentUser.tokens !== null;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    dispatch(actions.signOut());
    dispatch(socketActions.socketDisconnect());
    dispatch(deviceActions.removeAllDevices());
    dispatch(sharedDeviceActions.removeAllSharedDevices());
    dispatch(subDeviceActions.removeAllSubDevices());
    dispatch(deviceParamActions.removeAllDeviceParams());
    dispatch(subDeviceParamActions.removeAllSubDeviceParams());
    dispatch(deviceSettingActions.removeAllSettings());
    dispatch(subDeviceSettingActions.removeAllSettings());
    dispatch(onlineDeviceActions.removeAllOnlineDevices());
    dispatch(logActions.removeAllLogs());
  };

  const renderLoggedInMenu = () => {
    if (isLoggedIn) {
      return (
        <div data-test="loggedInMenuContainer">
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
            data-test="MenuOpenerButtonIconComponent"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open}
            onClose={handleClose}
            data-test="MenuComponent"
          >
            <MenuItem>{currentUser.name}</MenuItem>
            <MenuItem onClick={handleLogout} data-test="MenuItemComponent">
              Logout
            </MenuItem>
          </Menu>
        </div>
      );
    }
  };

  return (
    <AppBar position="fixed" data-test="navbar">
      <Toolbar data-test="toolbar">
        <BrightnessAutoIcon data-test="icon" />
        <Typography variant="h6" className={classes.title} color="inherit" noWrap data-test="appName">
          {props.appName}
        </Typography>
        {renderLoggedInMenu()}
      </Toolbar>
    </AppBar>
  );
}

Navbar.propTypes = {
  appName: PropTypes.string.isRequired,
  'data-test': PropTypes.string.isRequired,
};

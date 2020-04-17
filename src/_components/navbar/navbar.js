import AppBar from '@material-ui/core/AppBar/AppBar';
import Hidden from '@material-ui/core/Hidden';
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
import { adminDrawerActions } from '../../_actions/admin-drawer/adminDrawer.actions';
import { authInterceptor } from '../../_interceptors/auth/auth.interceptor';
import clsx from 'clsx';
import MenuIcon from '@material-ui/icons/Menu';
import { history } from '../../_helpers/history/history';

const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  hide: {
    display: 'none',
  },
}));

export default function Navbar(props) {
  const currentUser = useSelector(state => state.user);
  const adminDrawer = useSelector(state => state.adminDrawer);
  const isLoggedIn = currentUser.isLoggedIn && currentUser.tokens !== null;
  const isAdmin = isLoggedIn && currentUser.role === 'admin';
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
    dispatch(authInterceptor.disconnect());
  };

  const handleDrawerToggle = () => {
    if (adminDrawer.open) {
      dispatch(adminDrawerActions.close());
    } else {
      dispatch(adminDrawerActions.open());
    }
  };

  const handleNavigation = path => () => {
    handleClose();
    history.push(path);
  };

  const renderAdminMenu = () => {
    if (isAdmin) {
      return (
        <MenuItem onClick={handleNavigation('/admin')} data-test="adminPanelMenuItem">
          Admin Panel
        </MenuItem>
      );
    }
  };

  const renderAdminMenuButton = () => {
    if (isAdmin) {
      return (
        <Hidden smUp implementation="css">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            edge="start"
            className={clsx(classes.menuButton, { [classes.hide]: open })}
            data-test="drawerIconButtonComponent"
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
      );
    }
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
            {renderAdminMenu()}
            <MenuItem onClick={handleLogout} data-test="MenuItemComponent">
              Logout
            </MenuItem>
          </Menu>
        </div>
      );
    }
  };

  return (
    <AppBar position="fixed" className={classes.appBar} data-test="navbar">
      <Toolbar data-test="toolbar">
        {renderAdminMenuButton()}
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

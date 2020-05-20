import AppBar from '@material-ui/core/AppBar/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import BrightnessAutoIcon from '@material-ui/icons/BrightnessAuto';
import MenuIcon from '@material-ui/icons/Menu';
import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { adminDrawerActions } from '../../_actions/admin-drawer/adminDrawer.actions';
import { SiteSettingContext } from '../../_contexts/site-setting/SiteSettingContext.provider';
import { UserContext } from '../../_contexts/user/UserContext.provider';
import { history } from '../../_helpers/history/history';
import { authInterceptor } from '../../_interceptors/auth/auth.interceptor';

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

const Navbar = ({ appName }) => {
  const siteSettingContext = useContext(SiteSettingContext);
  const userContext = useContext(UserContext);
  const currentUser = userContext.user;
  const isLoggedIn = userContext.isLoggedIn;
  const isAdmin = userContext.isAdmin;
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
    if (siteSettingContext.drawer.open) {
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
    if (isAdmin && siteSettingContext && siteSettingContext.burger) {
      return (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerToggle}
          edge="start"
          data-test="drawerIconButtonComponent"
        >
          <MenuIcon />
        </IconButton>
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
        &nbsp;
        <Typography variant="h6" className={classes.title} color="inherit" noWrap data-test="appName">
          {appName}
        </Typography>
        {renderLoggedInMenu()}
      </Toolbar>
    </AppBar>
  );
};

Navbar.propTypes = {
  appName: PropTypes.string.isRequired,
  showBurgerIcon: PropTypes.bool,
  'data-test': PropTypes.string.isRequired,
};

export default Navbar;

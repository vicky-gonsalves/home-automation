import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import BrightnessAutoIcon from '@material-ui/icons/BrightnessAuto';
import DevicesIcon from '@material-ui/icons/Devices';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useContext, useLayoutEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { adminDrawerActions } from '../../_actions/admin-drawer/adminDrawer.actions';
import { SiteSettingContext } from '../../_contexts/site-setting/SiteSettingContext.provider';
import config from '../../config';
import ListItemLink from '../list-link-item/listItemLink';

const useStyles = makeStyles(theme => ({
  drawer: {
    width: config.drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: config.drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.easeIn,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
    width: 0,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(7) + 1,
    },
  },
  drawerPaper: {
    width: config.drawerWidth,
  },
}));

const AdminDrawer = ({ width }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const siteSettingContext = useContext(SiteSettingContext);
  const isMobile = useMemo(() => !isWidthUp('md', width) && !isWidthUp('lg', width) && !isWidthUp('xl', width), [width]);

  useLayoutEffect(() => {
    const initDrawer = () => {
      if (isMobile) {
        dispatch(adminDrawerActions.close());
      } else {
        dispatch(adminDrawerActions.open());
      }
    };
    initDrawer();
  }, [dispatch, width, isMobile]);

  const menuList = [
    { name: 'Users', path: '/users', icon: <SupervisorAccountIcon /> },
    { name: 'Devices', path: '/devices', icon: <DevicesIcon /> },
  ];

  const handleDrawerToggle = useMemo(
    () => () => {
      if (siteSettingContext.drawer.open) {
        dispatch(adminDrawerActions.close());
      } else {
        dispatch(adminDrawerActions.open());
      }
    },
    [dispatch, siteSettingContext.drawer.open]
  );

  const renderMenuList = useMemo(
    () =>
      menuList.map(menu => (
        <ListItemLink key={menu.name} icon={menu.icon} primary={menu.name} to={menu.path} isMobile={isMobile} />
      )),
    [isMobile, menuList]
  );

  const renderMenu = useMemo(
    () => (
      <React.Fragment>
        <Toolbar>
          <BrightnessAutoIcon data-test="icon" />
          &nbsp;
          <Typography variant="h6" className={classes.title} color="primary" noWrap data-test="appNameMobile">
            {config.appName}
          </Typography>
        </Toolbar>
        <Divider />
        <div className={isMobile ? '' : classes.drawerPaper} data-test="listContainer">
          <List data-test="listComponent"> {renderMenuList} </List>
        </div>
      </React.Fragment>
    ),
    [classes.drawerPaper, classes.title, isMobile, renderMenuList]
  );

  const mobileDrawer = useMemo(
    () => (
      <SwipeableDrawer
        anchor="left"
        open={siteSettingContext.drawer.open}
        onClose={handleDrawerToggle}
        onOpen={() => {}}
        data-test="mobileDrawer"
      >
        {renderMenu}
      </SwipeableDrawer>
    ),
    [handleDrawerToggle, renderMenu, siteSettingContext.drawer.open]
  );

  const deskTopDrawer = useMemo(
    () => (
      <Drawer
        open={siteSettingContext.drawer.open}
        onClose={handleDrawerToggle}
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: siteSettingContext.drawer.open,
          [classes.drawerClose]: !siteSettingContext.drawer.open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: siteSettingContext.drawer.open,
            [classes.drawerClose]: !siteSettingContext.drawer.open,
          }),
        }}
        data-test="nonMobileDrawer"
      >
        {renderMenu}
      </Drawer>
    ),
    [classes.drawer, classes.drawerClose, classes.drawerOpen, handleDrawerToggle, renderMenu, siteSettingContext.drawer.open]
  );

  return useMemo(() => {
    if (isMobile) {
      return mobileDrawer;
    } else {
      return deskTopDrawer;
    }
  }, [deskTopDrawer, isMobile, mobileDrawer]);
};

AdminDrawer.propTypes = {
  classes: PropTypes.shape({
    drawer: PropTypes.string.isRequired,
    drawerOpen: PropTypes.string.isRequired,
    drawerClose: PropTypes.string.isRequired,
    drawerPaper: PropTypes.string.isRequired,
  }),
  width: PropTypes.string.isRequired,
};

export default withWidth()(AdminDrawer);

import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import DevicesIcon from '@material-ui/icons/Devices';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { adminDrawerActions } from '../../_actions/admin-drawer/adminDrawer.actions';
import ListItemLink from '../list-link-item/listItemLink';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
}));

const AdminDrawer = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const adminDrawer = useSelector(state => state.adminDrawer);

  const menuList = [
    { name: 'Users', path: '/users', icon: <SupervisorAccountIcon /> },
    { name: 'Devices', path: '/home', icon: <DevicesIcon /> },
  ];

  const handleDrawerToggle = () => {
    if (adminDrawer.open) {
      dispatch(adminDrawerActions.close());
    } else {
      dispatch(adminDrawerActions.open());
    }
  };

  const renderMenuList = menuList.map(menu => (
    <ListItemLink key={menu.name} icon={menu.icon} primary={menu.name} to={menu.path} />
  ));

  const renderMenu = (
    <React.Fragment>
      <Toolbar />
      <div className={classes.drawerContainer} data-test="listContainer">
        <List data-test="listComponent"> {renderMenuList} </List>
      </div>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <Hidden smUp implementation="css">
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={adminDrawer.open}
          classes={{ paper: classes.drawerPaper }}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          data-test="mobileDrawer"
        >
          {renderMenu}
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer classes={{ paper: classes.drawerPaper }} variant="persistent" open data-test="nonMobileDrawer">
          {renderMenu}
        </Drawer>
      </Hidden>
    </React.Fragment>
  );
};

export default AdminDrawer;

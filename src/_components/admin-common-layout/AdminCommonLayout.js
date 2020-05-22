import { CssBaseline } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useContext, useMemo } from 'react';
import { SiteSettingContext } from '../../_contexts/site-setting/SiteSettingContext.provider';
import config from '../../config';
import AdminDrawer from '../admin-drawer/adminDrawer';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.up('md')]: {
      marginLeft: theme.spacing(7) + 1,
    },
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeIn,
      duration: theme.transitions.duration.enteringScreen,
    }),
    [theme.breakpoints.up('md')]: {
      marginLeft: config.drawerWidth,
    },
  },
}));

const AdminCommonLayout = ({ component }) => {
  const classes = useStyles();
  const siteSettingContext = useContext(SiteSettingContext);

  return useMemo(() => {
    if (typeof component === 'object') {
      return (
        <React.Fragment>
          <CssBaseline />
          <AdminDrawer data-test="adminDrawerComponent" />
          <main
            className={clsx(classes.content, {
              [classes.contentShift]: siteSettingContext.drawer.open,
            })}
            data-test="adminCommonLayoutContainer"
          >
            <div>{component}</div>
          </main>
        </React.Fragment>
      );
    }
    return null;
  }, [classes.content, classes.contentShift, component, siteSettingContext.drawer.open]);
};

AdminCommonLayout.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
    footer: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    contentShift: PropTypes.string.isRequired,
  }),
  component: PropTypes.object.isRequired,
};

export default AdminCommonLayout;

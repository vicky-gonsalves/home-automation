import { CssBaseline } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import config from '../../config';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.up('md')]: {
      marginLeft: theme.spacing(7) + 1,
    },
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    [theme.breakpoints.up('md')]: {
      marginLeft: config.drawerWidth,
    },
  },
}));

const AdminCommonLayout = ({ component }) => {
  const classes = useStyles();
  const adminDrawer = useSelector(state => state.adminDrawer);

  const renderAdminCommonLayout = () => {
    if (typeof component === 'object') {
      return (
        <React.Fragment>
          <CssBaseline />
          <main
            className={clsx(classes.content, {
              [classes.contentShift]: adminDrawer.open,
            })}
            data-test="adminCommonLayoutContainer"
          >
            <div>{component}</div>
          </main>
        </React.Fragment>
      );
    }
    return null;
  };

  return renderAdminCommonLayout();
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

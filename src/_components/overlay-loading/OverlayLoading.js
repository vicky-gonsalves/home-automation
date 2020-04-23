import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import PropTypes from 'prop-types';
import React from 'react';

const useStyles = makeStyles(theme => ({
  overlayComponent: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 11,
  },
  loadingOverlayContainer: {
    display: 'table',
    width: '100%',
    height: '100%',
    backgroundColor: fade(theme.palette.background.paper, 0.7),
  },
  loadingOverlay: {
    display: 'table-cell',
    width: '100%',
    height: '100%',
    verticalAlign: 'middle',
    textAlign: 'center',
  },
}));

const OverlayLoading = () => {
  const classes = useStyles();
  return (
    <div className={classes.overlayComponent}>
      <div className={classes.loadingOverlayContainer}>
        <div className={classes.loadingOverlay}>
          <CircularProgress />
        </div>
      </div>
    </div>
  );
};

OverlayLoading.propTypes = {
  classes: PropTypes.shape({
    overlayComponent: PropTypes.string.isRequired,
    loadingOverlayContainer: PropTypes.string.isRequired,
    loadingOverlay: PropTypes.string.isRequired,
  }),
};

export default OverlayLoading;

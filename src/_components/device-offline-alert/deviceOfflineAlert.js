import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';
import React from 'react';

const useStyles = makeStyles(theme => ({
  alert: {
    marginBottom: theme.spacing(4),
  },
}));

const DeviceOfflineAlert = () => {
  const classes = useStyles();
  return (
    <Alert severity="warning" className={classes.alert}>
      <AlertTitle>Warning</AlertTitle>
      This device is currently offline. All new actions/settings will be applied once device comes back online.
    </Alert>
  );
};

export default DeviceOfflineAlert;

import green from '@material-ui/core/colors/green';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import InfoIcon from '@material-ui/icons/Info';
import React from 'react';

const useStyles = makeStyles(theme => ({
  typo: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: theme.spacing(2),
  },
  icon: {
    marginTop: theme.spacing(-0.2),
    cursor: 'pointer',
  },
}));

const PreferredDevice = () => {
  const classes = useStyles();
  return (
    <Typography variant="body2" className={classes.typo} data-test="preferredDeviceContainer">
      <Tooltip
        title="Preferred device for automatic start/stop mode"
        placement="top"
        data-test="preferredDeviceTitleComponent"
      >
        <InfoIcon
          fontSize="small"
          style={{ color: green[500] }}
          className={classes.icon}
          data-test="preferredDeviceInfoIconComponent"
        />
      </Tooltip>
      &nbsp;
      <strong>Preferred Device</strong>
    </Typography>
  );
};

PreferredDevice.propTypes = {};

export default PreferredDevice;

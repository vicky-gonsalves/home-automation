import { CardContent } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import AdbIcon from '@material-ui/icons/Adb';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import Alert from '@material-ui/lab/Alert';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
  cardContent: {
    padding: theme.spacing(0, 1),
  },
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 300,
  },
  cursor: {
    cursor: 'pointer',
  },
}));
const Stats = ({ deviceId }) => {
  const classes = useStyles();
  const allLogs = useSelector(state => state.log && state.log.logs);
  const thisLogs = allLogs.filter(log => log.deviceId === deviceId);

  const renderStatsAlert = () => {
    if (thisLogs.length <= 0) {
      return (
        <Alert severity="info" data-test="StatsAlertComponent">
          It seems there are no logs yet.
        </Alert>
      );
    }
  };

  const renderDeviceLog = log => {
    if (log && log.triggeredByDevice) {
      return (
        <ListItemIcon className={classes.cursor} data-test="StatsListItemDeviceIconComponent">
          <Tooltip title="Action performed automatically by system">
            <AdbIcon />
          </Tooltip>
        </ListItemIcon>
      );
    }
  };

  const renderManualLog = log => {
    if (!log.triggeredByDevice) {
      return (
        <ListItemIcon className={classes.cursor} data-test="StatsListItemManualIconComponent">
          <Tooltip title="Action performed manually by user">
            <PermIdentityIcon />
          </Tooltip>
        </ListItemIcon>
      );
    }
  };

  const renderLogList = (log, index) => {
    return (
      <ListItem key={`${deviceId}-log-${index}`} data-test="StatsListItemComponent">
        {renderDeviceLog(log)}
        {renderManualLog(log)}
        <Typography key={log.id} component="div" color="textPrimary" variant="caption">
          {log.logDescription} - by {log.triggeredByDevice ? 'system' : log.userName} <br /> -{' '}
          {moment(log.createdAt).format('MMMM Do YYYY, h:mm:ss A')}
        </Typography>
      </ListItem>
    );
  };

  return (
    <CardContent className={classes.cardContent} data-test="StatsCardContainer">
      {renderStatsAlert()}
      <List className={classes.root} subheader={<li />}>
        {thisLogs && thisLogs.length > 0 && thisLogs.map((log, index) => renderLogList(log, index))}
      </List>
    </CardContent>
  );
};

Stats.propTypes = {
  deviceId: PropTypes.string.isRequired,
};

export default Stats;

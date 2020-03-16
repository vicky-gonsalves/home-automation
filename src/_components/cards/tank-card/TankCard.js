import { Card, CardContent, CardHeader } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import SettingsIcon from '@material-ui/icons/Settings';
import WifiIcon from '@material-ui/icons/Wifi';
import React from 'react';
import MotorMode from '../../radios/motor-mode/motorMode';
import MotorStatus from '../../switches/motor-status/motorStatus';
import Tank from '../../tank/tank';
import TankCardAction from '../tank-card-action/TankCardAction';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(0),
  },
  default: {
    minHeight: 240,
  },
  cardHeader: {
    padding: theme.spacing(1, 2),
  },
  cardContent: {
    padding: theme.spacing(0, 1),
  },
  mode: {
    margin: theme.spacing(1, 0),
  },
  buttonsGrp: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const TankCard = props => {
  const classes = useStyles();

  return (
    <Card className={classes.default}>
      <CardHeader
        className={classes.cardHeader}
        avatar={<WifiIcon color="primary" />}
        action={
          <IconButton aria-label="settings">
            <SettingsIcon />
          </IconButton>
        }
        title={props.deviceName}
        titleTypographyProps={{ align: 'center', variant: 'h6', color: 'primary', gutterBottom: false }}
      />
      <CardContent className={classes.cardContent}>
        <div className={classes.root}>
          <Grid container spacing={1}>
            <Grid item xs={5} sm={4} md={5} lg={3}>
              <Tank />
            </Grid>
            <Grid item xs={7} sm={8} md={7} lg={9} className={classes.buttonsGrp}>
              <MotorStatus />
              <MotorMode />
            </Grid>
          </Grid>
        </div>
        <Typography component="div" color="textSecondary" variant="caption">
          Last update at: Feb 18, 2020, 11:49:51 AM
        </Typography>
      </CardContent>
      <TankCardAction />
    </Card>
  );
};

export default TankCard;

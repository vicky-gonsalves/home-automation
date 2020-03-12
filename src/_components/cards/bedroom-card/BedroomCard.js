import { Card, CardContent, CardHeader } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import SettingsIcon from '@material-ui/icons/Settings';
import WifiIcon from '@material-ui/icons/Wifi';
import React from 'react';
import Bedroom from '../../bedroom/Bedroom';
import BedroomStatus from '../../switches/bedroom-status/BedroomStatus';
import BedroomCardAction from '../bedroom-card-action/BedroomCardAction';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(0),
  },
  default: {
    minHeight: 240,
    display: 'flex',
    flexDirection: 'column',
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
  grow: {
    flexGrow: 1,
  },
  caption: {
    marginTop: theme.spacing(4),
  },
}));

const BedroomCard = () => {
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
        title="Bedroom"
        titleTypographyProps={{ align: 'center', variant: 'h6', color: 'primary', gutterBottom: false }}
      />
      <CardContent className={classes.cardContent}>
        <div className={classes.root}>
          <Grid container spacing={1}>
            <Grid item xs={9} sm={9} md={9} lg={9}>
              <Bedroom />
            </Grid>
            <Grid item xs={3} sm={3} md={3} lg={3} className={classes.buttonsGrp}>
              <BedroomStatus />
            </Grid>
          </Grid>
        </div>
        <Typography component="div" color="textSecondary" variant="caption" className={classes.caption}>
          Last update at: Feb 18, 2020, 11:49:51 AM
        </Typography>
      </CardContent>
      <div className={classes.grow} />
      <BedroomCardAction />
    </Card>
  );
};

export default BedroomCard;

import {CardContent} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';

const useStyles = makeStyles(theme => ({
  cardContent: {
    padding: theme.spacing(0, 1)
  }
}));
const OutdoorStats = () => {
  const classes = useStyles();

  return (
    <CardContent className={classes.cardContent}>
      <Typography component="div" color="textPrimary" variant="caption">Light 1 Turned OFF by Vicky 30 Minutes ago</Typography>
    </CardContent>
  );
};

export default OutdoorStats;

import { CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';

const useStyles = makeStyles(theme => ({
  cardContent: {
    padding: theme.spacing(0, 1),
  },
}));
const TankStats = () => {
  const classes = useStyles();

  return (
    <CardContent className={classes.cardContent}>
      <Typography component="div" color="textPrimary" variant="caption">
        Last turned OFF by Vicky 30 minutes ago at 100%
      </Typography>
      <Typography component="div" color="textPrimary" variant="caption">
        {' '}
        Last turned ON by Vicky for 30 minutes at 50%{' '}
      </Typography>
      <Typography component="div" color="textPrimary" variant="caption">
        Current water level: (124 cm / approx. 1000 Litres)
      </Typography>
    </CardContent>
  );
};

export default TankStats;

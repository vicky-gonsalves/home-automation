import { Hidden } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import React from 'react';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    padding: theme.spacing(0, 2),
  },
  textField: {
    width: '100%',
    height: 80,
  },
  button: {
    width: 150,
    height: 80,
  },
  subtitle1: {
    width: 300,
    height: 50,
  },
  subtitle2: {
    width: 200,
    height: 20,
  },
}));

const EditorSkeleton = () => {
  const classes = useStyles();
  return (
    <Grid container className={classes.root} spacing={10}>
      <Grid item xs={12} md={6}>
        <Grid item xs={12} xl={6}>
          <Skeleton animation="wave" className={classes.textField} />
        </Grid>
        <Grid item xs={12} xl={6}>
          <Skeleton animation="wave" className={classes.textField} />
        </Grid>
        <Grid item xs={12} xl={6}>
          <Skeleton animation="wave" className={classes.textField} />
        </Grid>
        <Grid item xs={12} xl={6}>
          <Skeleton animation="wave" className={classes.textField} />
        </Grid>
      </Grid>
      <Hidden smDown>
        <Grid item xs={12} md={6}>
          <Grid item xs={12} className={classes.info}>
            <Typography variant="subtitle2" display="block" gutterBottom>
              <Skeleton animation="wave" className={classes.subtitle2} />
            </Typography>
            <Typography variant="subtitle1" display="block" gutterBottom>
              <Skeleton animation="wave" className={classes.subtitle1} />
            </Typography>
          </Grid>

          <Grid item xs={12} className={classes.info}>
            <Typography variant="subtitle2" display="block" gutterBottom>
              <Skeleton animation="wave" className={classes.subtitle2} />
            </Typography>
            <Typography variant="subtitle1" display="block" gutterBottom>
              <Skeleton animation="wave" className={classes.subtitle1} />
            </Typography>
          </Grid>

          <Grid item xs={12} className={classes.info}>
            <Typography variant="subtitle2" display="block" gutterBottom>
              <Skeleton animation="wave" className={classes.subtitle2} />
            </Typography>
            <Typography variant="subtitle1" display="block" gutterBottom>
              <Skeleton animation="wave" className={classes.subtitle1} />
            </Typography>
          </Grid>

          <Grid item xs={12} className={classes.info}>
            <Typography variant="subtitle2" display="block" gutterBottom>
              <Skeleton animation="wave" className={classes.subtitle2} />
            </Typography>
            <Typography variant="subtitle1" display="block" gutterBottom>
              <Skeleton animation="wave" className={classes.subtitle1} />
            </Typography>
          </Grid>
        </Grid>
      </Hidden>

      <Grid item xs={12}>
        <Skeleton animation="wave" className={classes.button} />
      </Grid>
    </Grid>
  );
};

export default EditorSkeleton;

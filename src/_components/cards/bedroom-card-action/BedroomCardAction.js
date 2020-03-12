import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';
import React, { useState } from 'react';
import BedroomStats from '../bedroom-stats/BedroomStats';

const useStyles = makeStyles(theme => ({
  cardAction: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 1),
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

const BedroomCardAction = () => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <React.Fragment>
      <CardActions className={classes.cardAction}>
        <Typography component="div" color="error" variant="body1">
          Light will be turned off automatically in <strong>30 Minutes</strong>
        </Typography>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show stats"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <BedroomStats />
      </Collapse>
    </React.Fragment>
  );
};

export default BedroomCardAction;

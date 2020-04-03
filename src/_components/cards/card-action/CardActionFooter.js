import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import SmartSwitchAlert from '../../alerts/smart-switch-alert/smartSwitchAlert';
import TankAlert from '../../alerts/tank-alert/tankAlert';
import Stats from '../stats/Stats';

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

const CardActionFooter = props => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <React.Fragment>
      <CardActions className={classes.cardAction}>
        {props.deviceVariant === 'tank' && <TankAlert deviceId={props.deviceId} />}
        {props.deviceVariant === 'smartSwitch' && <SmartSwitchAlert deviceId={props.deviceId} />}
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
        <Stats deviceId={props.deviceId} />
      </Collapse>
    </React.Fragment>
  );
};

CardActionFooter.propTypes = {
  deviceId: PropTypes.string.isRequired,
  deviceVariant: PropTypes.string.isRequired,
};

export default CardActionFooter;

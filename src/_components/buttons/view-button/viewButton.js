import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import VisibilityIcon from '@material-ui/icons/Visibility';
import React from 'react';

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(0.5),
  },
}));

const ViewButton = ({ callback }) => {
  const classes = useStyles();
  return (
    <IconButton aria-label="view" className={classes.margin} size="small" onClick={callback}>
      <VisibilityIcon fontSize="small" />
    </IconButton>
  );
};

export default ViewButton;

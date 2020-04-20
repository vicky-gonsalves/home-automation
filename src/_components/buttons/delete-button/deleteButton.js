import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import React from 'react';

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(0.5),
  },
}));

const DeleteButton = ({ callback }) => {
  const classes = useStyles();
  return (
    <IconButton aria-label="delete" className={classes.margin} size="small" onClick={callback}>
      <DeleteIcon fontSize="small" />
    </IconButton>
  );
};

export default DeleteButton;

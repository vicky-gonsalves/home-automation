import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import React from 'react';

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(0.5),
  },
}));

const EditButton = ({ callback }) => {
  const classes = useStyles();
  return (
    <IconButton aria-label="edit" className={classes.margin} size="small" onClick={callback}>
      <EditIcon fontSize="small" />
    </IconButton>
  );
};

export default EditButton;

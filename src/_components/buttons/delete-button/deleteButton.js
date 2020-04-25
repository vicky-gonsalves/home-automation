import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import PropTypes from 'prop-types';
import React from 'react';

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(0.5),
  },
}));

const DeleteButton = ({ callback }) => {
  const classes = useStyles();
  return (
    <IconButton
      aria-label="delete"
      className={classes.margin}
      size="small"
      onClick={callback}
      data-test="deleteIconButtonComponent"
    >
      <DeleteIcon fontSize="small" data-test="deleteIconComponent" />
    </IconButton>
  );
};

DeleteButton.propTypes = {
  callback: PropTypes.func.isRequired,
};

export default DeleteButton;

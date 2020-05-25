import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(0.5),
  },
}));

const DeleteButton = ({ item, callback, useKey }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(callback(item[useKey]));
  };
  return (
    <IconButton
      aria-label="delete"
      className={classes.margin}
      size="small"
      onClick={handleClick}
      data-test="deleteIconButtonComponent"
    >
      <DeleteIcon fontSize="small" data-test="deleteIconComponent" />
    </IconButton>
  );
};

DeleteButton.propTypes = {
  item: PropTypes.object.isRequired,
  callback: PropTypes.func.isRequired,
  useKey: PropTypes.string.isRequired,
};

export default DeleteButton;

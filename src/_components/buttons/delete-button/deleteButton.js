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

const DeleteButton = ({ item, type }) => {
  const classes = useStyles();
  const handleClick = () => {
    // eslint-disable-next-line no-console
    console.log(item, type);
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
  type: PropTypes.string,
};

export default DeleteButton;

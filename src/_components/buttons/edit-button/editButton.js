import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import PropTypes from 'prop-types';
import React from 'react';

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(0.5),
  },
}));

const EditButton = ({ callback }) => {
  const classes = useStyles();
  return (
    <IconButton
      aria-label="edit"
      className={classes.margin}
      size="small"
      onClick={callback}
      data-test="editIconButtonComponent"
    >
      <EditIcon fontSize="small" data-test="editIconComponent" />
    </IconButton>
  );
};

EditButton.propTypes = {
  callback: PropTypes.func.isRequired,
};

export default EditButton;

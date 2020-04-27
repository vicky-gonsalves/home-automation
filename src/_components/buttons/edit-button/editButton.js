import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import PropTypes from 'prop-types';
import React from 'react';
import { history } from '../../../_helpers/history/history';

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(0.5),
  },
}));

const EditButton = ({ path }) => {
  const classes = useStyles();
  const handleClick = () => {
    history.push(path);
  };
  return (
    <IconButton
      aria-label="edit"
      className={classes.margin}
      size="small"
      onClick={handleClick}
      data-test="editIconButtonComponent"
    >
      <EditIcon fontSize="small" data-test="editIconComponent" />
    </IconButton>
  );
};

EditButton.propTypes = {
  path: PropTypes.string.isRequired,
};

export default EditButton;

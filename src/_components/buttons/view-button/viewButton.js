import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import VisibilityIcon from '@material-ui/icons/Visibility';
import React from 'react';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(0.5),
  },
}));

const ViewButton = ({ callback }) => {
  const classes = useStyles();
  return (
    <IconButton
      aria-label="view"
      className={classes.margin}
      size="small"
      onClick={callback}
      data-test="viewIconButtonComponent"
    >
      <VisibilityIcon fontSize="small" data-test="viewIconComponent" />
    </IconButton>
  );
};

ViewButton.propTypes = {
  callback: PropTypes.func.isRequired,
};

export default ViewButton;

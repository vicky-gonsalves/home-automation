import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import VisibilityIcon from '@material-ui/icons/Visibility';
import PropTypes from 'prop-types';
import React from 'react';
import { history } from '../../../_helpers/history/history';

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(0.5),
  },
}));

const ViewButton = ({ path, isFetching }) => {
  const classes = useStyles();
  const handleClick = () => {
    history.push(path);
  };

  return (
    <IconButton
      aria-label="view"
      className={classes.margin}
      size="small"
      onClick={handleClick}
      disabled={isFetching}
      data-test="viewIconButtonComponent"
    >
      <VisibilityIcon fontSize="small" data-test="viewIconComponent" />
    </IconButton>
  );
};

ViewButton.propTypes = {
  path: PropTypes.string.isRequired,
  isFetching: PropTypes.bool,
};

export default ViewButton;

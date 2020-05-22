import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles(theme => ({
  margin: {
    // margin: theme.spacing(0.5),
  },
  button: {
    // margin: theme.spacing(1),
    // width: 130,
  },
}));

const ConfirmButton = ({ item, callback, cancelCallback }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const handleConfirm = () => {
    dispatch(callback(item.id));
  };
  const handleCancel = () => {
    dispatch(cancelCallback(item.id));
  };
  const renderButton = () => {
    return (
      <React.Fragment>
        <IconButton
          aria-label="confirm"
          className={classes.margin}
          data-test="checkIconButtonComponent"
          onClick={handleConfirm}
        >
          <CheckIcon fontSize="small" data-test="checkIconComponent" />
        </IconButton>
        <IconButton
          aria-label="cancel"
          className={classes.margin}
          data-test="clearIconButtonComponent"
          onClick={handleCancel}
        >
          <ClearIcon fontSize="small" data-test="clearIconComponent" />
        </IconButton>
      </React.Fragment>
    );
  };
  return renderButton();
};

ConfirmButton.propTypes = {
  classes: PropTypes.shape({
    margin: PropTypes.string.isRequired,
    button: PropTypes.string.isRequired,
    callback: PropTypes.func.isRequired,
    cancelCallback: PropTypes.func.isRequired,
  }),
};

export default ConfirmButton;

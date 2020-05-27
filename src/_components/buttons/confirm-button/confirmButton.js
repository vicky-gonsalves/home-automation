import IconButton from '@material-ui/core/IconButton';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';

const ConfirmButton = ({ item, callback, cancelCallback, useKey, isFetching }) => {
  const dispatch = useDispatch();
  const handleConfirm = () => callback(item[useKey]);
  const handleCancel = () => {
    dispatch(cancelCallback(item[useKey]));
  };
  const renderButton = () => {
    return (
      <React.Fragment>
        <IconButton aria-label="confirm" data-test="checkIconButtonComponent" onClick={handleConfirm} disabled={isFetching}>
          <CheckIcon fontSize="small" data-test="checkIconComponent" />
        </IconButton>
        <IconButton aria-label="cancel" data-test="clearIconButtonComponent" onClick={handleCancel} disabled={isFetching}>
          <ClearIcon fontSize="small" data-test="clearIconComponent" />
        </IconButton>
      </React.Fragment>
    );
  };
  return renderButton();
};

ConfirmButton.propTypes = {
  item: PropTypes.object.isRequired,
  callback: PropTypes.func.isRequired,
  cancelCallback: PropTypes.func.isRequired,
  useKey: PropTypes.string.isRequired,
  isFetching: PropTypes.bool,
};

export default ConfirmButton;

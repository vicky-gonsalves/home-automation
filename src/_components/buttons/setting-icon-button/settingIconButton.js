import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import { settingDialogActions } from '../../../_actions/settingDialog.actions';

const SettingIconButton = ({ deviceId, deviceName, dialogType }) => {
  const dispatch = useDispatch();
  const handleSettingDialog = () => dispatch(settingDialogActions.open(deviceName, deviceId, dialogType));
  return (
    <IconButton aria-label="settings" onClick={handleSettingDialog} data-test="settingIconButtonComponent">
      <SettingsIcon />
    </IconButton>
  );
};

SettingIconButton.propTypes = {
  deviceId: PropTypes.string.isRequired,
  deviceName: PropTypes.string.isRequired,
  dialogType: PropTypes.string.isRequired,
};

export default SettingIconButton;

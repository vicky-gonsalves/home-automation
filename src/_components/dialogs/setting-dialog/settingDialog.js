import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import LinearProgress from '@material-ui/core/LinearProgress';
import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { settingDialogActions } from '../../../_actions/setting-dialog/settingDialog.actions';
import { DeviceSettingContext } from '../../../_contexts/device-setting/DeviceSettingContext.provider';
import { SettingDialogContext } from '../../../_contexts/setting-dialog/SettingDialogContext.provider';
import { SubDeviceSettingContext } from '../../../_contexts/sub-device-setting/SubDeviceSettingContext.provider';
import MotorSettingForm from '../../forms/motor-setting-form/MotorSettingForm';
import SmartSwitchSettingForm from '../../forms/smart-switch-setting-form/SmartSwitchSettingForm';

const SettingDialog = () => {
  const dispatch = useDispatch();
  const deviceSettingContext = useContext(DeviceSettingContext);
  const subDeviceSettingContext = useContext(SubDeviceSettingContext);
  const settingDialogContext = useContext(SettingDialogContext);
  const settingDialog = settingDialogContext.settingDialog;
  const isFetchingDeviceSetting = deviceSettingContext.isFetchingDeviceSetting;
  const isFetchingSubDeviceSetting = subDeviceSettingContext.isFetchingSubDeviceSetting;
  const handleClose = () => dispatch(settingDialogActions.close());
  const handleExit = () => dispatch(settingDialogActions.reset());

  const renderProgress = () => {
    if (isFetchingDeviceSetting || isFetchingSubDeviceSetting) {
      return <LinearProgress color="secondary" data-test="linearProgressComponent" />;
    }
  };

  const renderDialogTitle = () => {
    if (settingDialog && settingDialog.deviceId && settingDialog.title) {
      return (
        <DialogTitle id={settingDialog.deviceId + '_setting'} data-test="dialogTitleComponent">
          {settingDialog.title} Settings
        </DialogTitle>
      );
    }
  };

  const motorSettingForm = () => {
    if (settingDialog && settingDialog.dialogType === 'tank' && settingDialog.deviceId) {
      return <MotorSettingForm deviceId={settingDialog.deviceId} data-test="motorSettingFormComponent" />;
    }
  };

  const smartSwitchSettingForm = () => {
    if (settingDialog && settingDialog.dialogType === 'smartSwitch' && settingDialog.deviceId) {
      return <SmartSwitchSettingForm deviceId={settingDialog.deviceId} data-test="smartSwitchSettingFormComponent" />;
    }
  };

  const renderDialog = () => {
    if (settingDialog && settingDialog.open && settingDialog.title) {
      return (
        <Dialog
          fullWidth={true}
          open={settingDialog.open}
          onClose={handleClose}
          onExited={handleExit}
          aria-labelledby={settingDialog.title}
          data-test="settingDialogComponent"
        >
          {renderDialogTitle()}
          <DialogContent>
            {motorSettingForm()}
            {smartSwitchSettingForm()}
          </DialogContent>
          {renderProgress()}
        </Dialog>
      );
    }
  };

  return <div data-test="settingDialogContainer">{renderDialog()}</div>;
};

SettingDialog.propTypes = {};

export default SettingDialog;

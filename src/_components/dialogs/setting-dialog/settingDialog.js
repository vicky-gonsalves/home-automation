import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import LinearProgress from '@material-ui/core/LinearProgress';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { settingDialogActions } from '../../../_actions/setting-dialog/settingDialog.actions';
import MotorSettingForm from '../../forms/motor-setting-form/MotorSettingForm';
import SmartSwitchSettingForm from '../../forms/smart-switch-setting-form/SmartSwitchSettingForm';

const SettingDialog = () => {
  const dispatch = useDispatch();
  const settingDialog = useSelector(state => state.settingDialog);
  const isFetchingDeviceSetting = useSelector(state => state.deviceSetting && state.deviceSetting.isFetching);
  const isFetchingSubDeviceSetting = useSelector(state => state.subDeviceSetting && state.subDeviceSetting.isFetching);
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

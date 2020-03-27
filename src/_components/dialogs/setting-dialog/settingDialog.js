import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { settingDialogActions } from '../../../_actions/settingDialog.actions';
import MotorSettingForm from '../../forms/motor-setting-form/MotorSettingForm';
import SmartSwitchSettingForm from '../../forms/smart-switch-setting-form/SmartSwitchSettingForm';

const SettingDialog = () => {
  const dispatch = useDispatch();
  const settingDialog = useSelector(state => state.settingDialog);
  const handleClose = () => dispatch(settingDialogActions.close());
  const handleExit = () => dispatch(settingDialogActions.reset());

  return (
    <div>
      <Dialog
        fullWidth={true}
        open={settingDialog.open}
        onClose={handleClose}
        onExited={handleExit}
        aria-labelledby={settingDialog.title}
      >
        <DialogTitle id={settingDialog.deviceId + '_setting'}>{settingDialog.title} Settings</DialogTitle>
        <DialogContent>
          {settingDialog && settingDialog.dialogType === 'tank' && <MotorSettingForm deviceId={settingDialog.deviceId} />}
          {settingDialog && settingDialog.dialogType === 'smartSwitch' && (
            <SmartSwitchSettingForm deviceId={settingDialog.deviceId} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SettingDialog;

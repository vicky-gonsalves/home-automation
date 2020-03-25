import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { settingDialogActions } from '../../../_actions/settingDialog.actions';
import MotorSettingForm from '../../forms/motorSettingForm/MotorSettingForm';

const MotorSettingDialog = props => {
  const dispatch = useDispatch();
  const settingDialog = useSelector(state => state.settingDialog);

  const handleClose = () => {
    dispatch(settingDialogActions.close());
  };

  return (
    <div>
      <Dialog open={settingDialog.open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{props.name} Settings</DialogTitle>
        <DialogContent>
          <MotorSettingForm deviceId={props.deviceId} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MotorSettingDialog;

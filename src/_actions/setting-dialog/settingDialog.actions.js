import { settingDialogConstants } from '../../_constants';

const open = (title, deviceId, dialogType) => dispatch =>
  dispatch({ type: settingDialogConstants.OPEN_SETTINGS, payload: { title, deviceId, dialogType } });

const close = () => dispatch => dispatch({ type: settingDialogConstants.CLOSE_SETTINGS });

const reset = () => dispatch => dispatch({ type: settingDialogConstants.RESET_SETTINGS });

export const settingDialogActions = {
  open,
  close,
  reset,
};

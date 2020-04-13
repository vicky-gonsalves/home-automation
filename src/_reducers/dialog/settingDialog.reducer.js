import { settingDialogConstants } from '../../_constants';

const initialState = {
  dialogType: null,
  open: false,
  deviceId: null,
  title: null,
};

const settingDialog = (state = initialState, action) => {
  switch (action.type) {
    case settingDialogConstants.OPEN_SETTINGS:
      return {
        ...state,
        open: true,
        dialogType: action.payload.dialogType,
        deviceId: action.payload.deviceId,
        title: action.payload.title,
      };

    case settingDialogConstants.CLOSE_SETTINGS:
      return {
        ...state,
        open: false,
      };

    case settingDialogConstants.RESET_SETTINGS:
      return {
        ...state,
        dialogType: null,
        deviceId: null,
        title: null,
      };
    default:
      return state;
  }
};
export default settingDialog;

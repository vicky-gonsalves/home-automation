import { settingDialogConstants } from '../../_constants';

const initialState = {
  open: false,
};

const settingDialog = (state = initialState, action) => {
  switch (action.type) {
    case settingDialogConstants.OPEN:
      return {
        ...state,
        open: true,
      };
    case settingDialogConstants.CLOSE:
      return {
        ...state,
        open: false,
      };
    default:
      return state;
  }
};
export default settingDialog;

import { settingDialogConstants } from '../_constants';

const open = () => dispatch => {
  dispatch({
    type: settingDialogConstants.OPEN,
  });
};

const close = () => dispatch => {
  dispatch({
    type: settingDialogConstants.CLOSE,
  });
};

export const settingDialogActions = {
  open,
  close,
};

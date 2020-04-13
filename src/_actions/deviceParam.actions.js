import { deviceParamConstants } from '../_constants';

const removeAllDeviceParams = () => dispatch => {
  dispatch({
    type: deviceParamConstants.DEVICE_PARAM_REMOVE_ALL,
  });
};

export const deviceParamActions = {
  removeAllDeviceParams,
};

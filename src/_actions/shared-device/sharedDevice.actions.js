import { sharedDeviceConstants } from '../../_constants';

const removeAllSharedDevices = () => dispatch => {
  dispatch({
    type: sharedDeviceConstants.SHARED_DEVICE_REMOVE_ALL,
  });
};

export const sharedDeviceActions = {
  removeAllSharedDevices,
};

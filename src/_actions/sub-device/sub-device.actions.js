import { subDeviceConstants } from '../../_constants';

const removeAllSubDevices = () => dispatch => {
  dispatch({
    type: subDeviceConstants.SUB_DEVICE_REMOVE_ALL,
  });
};

export const subDeviceActions = {
  removeAllSubDevices,
};

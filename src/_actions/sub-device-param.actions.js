import { subDeviceParamConstants } from '../_constants';
import { subDeviceParamService } from '../_services';

const removeAllSubDeviceParams = () => dispatch => {
  dispatch({
    type: subDeviceParamConstants.SUB_DEVICE_PARAM_REMOVE_ALL,
  });
};

const updateSubDeviceParamStatus = subDeviceParam => async dispatch => {
  // Temporary update: actual data will be fetched through socket
  dispatch({
    type: subDeviceParamConstants.SUB_DEVICE_PARAM_UPDATE_STATUS,
    payload: subDeviceParam,
  });
  try {
    await subDeviceParamService.updateSubDeviceParamStatus(subDeviceParam);
  } catch (e) {
    const _subDeviceParam = subDeviceParam;
    _subDeviceParam.paramValue = subDeviceParam.paramValue === 'off' ? 'on' : 'off';
    dispatch({
      type: subDeviceParamConstants.SUB_DEVICE_PARAM_UPDATE_STATUS,
      payload: _subDeviceParam,
    });
  }
};

const updateSubDeviceParamMode = subDeviceParam => async dispatch => {
  // Temporary update: actual data will be fetched through socket
  dispatch({
    type: subDeviceParamConstants.SUB_DEVICE_PARAM_UPDATE_STATUS,
    payload: subDeviceParam,
  });
  try {
    await subDeviceParamService.updateSubDeviceParamMode(subDeviceParam);
  } catch (e) {
    const _subDeviceParam = subDeviceParam;
    _subDeviceParam.paramValue = subDeviceParam.paramValue === 'manual' ? 'automatic' : 'manual';
    dispatch({
      type: subDeviceParamConstants.SUB_DEVICE_PARAM_UPDATE_STATUS,
      payload: _subDeviceParam,
    });
  }
};

const updateAllSubDeviceParamStatus = (deviceId, status) => async dispatch => {
  try {
    await subDeviceParamService.updateAllSubDeviceParamStatus(deviceId, status);
  } catch (e) {
    // const _subDeviceParam = subDeviceParam;
    // _subDeviceParam.paramValue = subDeviceParam.paramValue === 'off' ? 'on' : 'off';
    // dispatch({
    //   type: subDeviceParamConstants.SUB_DEVICE_PARAM_UPDATE_STATUS,
    //   payload: _subDeviceParam,
    // });
  }
};

export const subDeviceParamActions = {
  updateSubDeviceParamStatus,
  updateSubDeviceParamMode,
  updateAllSubDeviceParamStatus,
  removeAllSubDeviceParams,
};

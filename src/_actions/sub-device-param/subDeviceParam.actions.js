import { subDeviceParamConstants } from '../../_constants';
import { subDeviceParamService } from '../../_services';

const removeAllSubDeviceParams = () => dispatch => {
  dispatch({
    type: subDeviceParamConstants.SUB_DEVICE_PARAM_REMOVE_ALL,
  });
};

const setProgress = flag => {
  return {
    type: subDeviceParamConstants.SET_PROGRESS,
    payload: flag,
  };
};

const setSubDeviceParamError = error => {
  return {
    type: subDeviceParamConstants.SET_SUB_DEVICE_PARAM_ERROR,
    payload: { error },
  };
};

const updateSubDeviceParamStatus = subDeviceParam => async dispatch => {
  // Temporary update: actual data will be fetched through socket
  dispatch({
    type: subDeviceParamConstants.SUB_DEVICE_PARAM_UPDATE_STATUS,
    payload: subDeviceParam,
  });
  try {
    dispatch(setProgress(true));
    await subDeviceParamService.updateSubDeviceParamStatus(subDeviceParam);
    dispatch(setProgress(false));
  } catch (e) {
    const _subDeviceParam = subDeviceParam;
    _subDeviceParam.paramValue = subDeviceParam.paramValue === 'off' ? 'on' : 'off';
    dispatch({
      type: subDeviceParamConstants.SUB_DEVICE_PARAM_UPDATE_STATUS,
      payload: _subDeviceParam,
    });
    dispatch(setProgress(false));
    dispatch(setSubDeviceParamError(e));
  }
};

const updateSubDeviceParamMode = subDeviceParam => async dispatch => {
  // Temporary update: actual data will be fetched through socket
  dispatch({
    type: subDeviceParamConstants.SUB_DEVICE_PARAM_UPDATE_STATUS,
    payload: subDeviceParam,
  });
  try {
    dispatch(setProgress(true));
    await subDeviceParamService.updateSubDeviceParamMode(subDeviceParam);
    dispatch(setProgress(false));
  } catch (e) {
    const _subDeviceParam = subDeviceParam;
    _subDeviceParam.paramValue = subDeviceParam.paramValue === 'manual' ? 'automatic' : 'manual';
    dispatch({
      type: subDeviceParamConstants.SUB_DEVICE_PARAM_UPDATE_STATUS,
      payload: _subDeviceParam,
    });
    dispatch(setProgress(false));
    dispatch(setSubDeviceParamError(e));
  }
};

const updateAllSubDeviceParamStatus = (deviceId, status) => async dispatch => {
  try {
    dispatch(setProgress(true));
    await subDeviceParamService.updateAllSubDeviceParamStatus(deviceId, status);
    dispatch(setProgress(false));
  } catch (e) {
    dispatch(setProgress(false));
    dispatch(setSubDeviceParamError(e));
  }
};

export const subDeviceParamActions = {
  updateSubDeviceParamStatus,
  updateSubDeviceParamMode,
  updateAllSubDeviceParamStatus,
  removeAllSubDeviceParams,
  setSubDeviceParamError,
};

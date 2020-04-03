import axios from 'axios';
import { actions } from '../../_actions';
import config from '../../config';

const handleResponse = response => {
  if (response && response.data) {
    return Promise.resolve(response.data);
  }
  return Promise.reject(response);
};

const handleResponseForAll = response => {
  if (response && response.status === 200) {
    return Promise.resolve(response);
  }
  return Promise.reject(response);
};

const handleError = error => {
  let err;
  if (error && error.response) {
    if (error.response.status === 401) {
      // auto logout if 401 response returned from api
      actions.signOut();
    }
    err = (error.response.data && error.response.data.message) || error.response.statusText;
  } else {
    err = 'Network Error';
  }
  return Promise.reject(err);
};

const updateSubDeviceParamStatus = async subDeviceParam => {
  try {
    const response = await axios.patch(
      `${config.apiUrl}/devices/${subDeviceParam.deviceId}/sub-devices/${subDeviceParam.subDeviceId}/sub-device-param-value/status`,
      { paramValue: subDeviceParam.paramValue }
    );
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

const updateSubDeviceParamMode = async subDeviceParam => {
  try {
    const response = await axios.patch(
      `${config.apiUrl}/devices/${subDeviceParam.deviceId}/sub-devices/${subDeviceParam.subDeviceId}/sub-device-param-value/mode`,
      { paramValue: subDeviceParam.paramValue }
    );
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

const updateAllSubDeviceParamStatus = async (deviceId, status) => {
  try {
    const response = await axios.patch(`${config.apiUrl}/devices/${deviceId}/sub-device-param-value/status`, {
      paramValue: status,
    });
    return handleResponseForAll(response);
  } catch (error) {
    return handleError(error);
  }
};

export const subDeviceParamService = {
  updateSubDeviceParamMode,
  updateSubDeviceParamStatus,
  updateAllSubDeviceParamStatus,
};

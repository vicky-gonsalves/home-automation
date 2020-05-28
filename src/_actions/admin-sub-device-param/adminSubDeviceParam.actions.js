import { adminSubDeviceParamConstants } from '../../_constants';
import { history } from '../../_helpers/history/history';
import { authInterceptor } from '../../_interceptors/auth/auth.interceptor';
import { adminSubDeviceParamService } from '../../_services';

const storeSubDeviceParamsList = response => dispatch => {
  dispatch({ type: adminSubDeviceParamConstants.STORE_SUB_DEVICE_PARAMS, payload: response });
};

const setFetchedSubDeviceParams = flag => dispatch => {
  dispatch({ type: adminSubDeviceParamConstants.SET_FETCHED_SUB_DEVICE_PARAMS, payload: flag });
};

const storeSubDeviceParam = response => dispatch => {
  dispatch({ type: adminSubDeviceParamConstants.STORE_SUB_DEVICE_PARAM, payload: response });
};

const setSubDeviceParamsFetching = flag => dispatch => {
  dispatch({ type: adminSubDeviceParamConstants.SET_FETCHING_SUB_DEVICE_PARAMS, payload: flag });
};

const setSubDeviceParamProgress = flag => dispatch => {
  dispatch({ type: adminSubDeviceParamConstants.SET_SUB_DEVICE_PARAM_PROGRESS, payload: flag });
};

const setFetchedEditableSubDeviceParam = flag => dispatch => {
  dispatch({ type: adminSubDeviceParamConstants.SET_FETCHED_EDITABLE_SUB_DEVICE_PARAM, payload: flag });
};

const clearSubDeviceParam = dispatch => {
  dispatch({ type: adminSubDeviceParamConstants.CLEAR_SUB_DEVICE_PARAM });
};

const removeSubDeviceParam = paramName => dispatch => {
  dispatch({ type: adminSubDeviceParamConstants.DELETE_SUB_DEVICE_PARAM, payload: paramName });
};

const setSubDeviceParamToBeDeleted = paramName => dispatch => {
  dispatch({ type: adminSubDeviceParamConstants.SET_SUB_DEVICE_PARAM_TO_BE_DELETED, payload: paramName });
};

const unsetSubDeviceParamToBeDeleted = paramName => dispatch => {
  dispatch({ type: adminSubDeviceParamConstants.UNSET_SUB_DEVICE_PARAM_TO_BE_DELETED, payload: paramName });
};

const getSubDeviceParams = (deviceId, subDeviceId, params) => async dispatch => {
  try {
    dispatch(setFetchedSubDeviceParams(true));
    dispatch(setSubDeviceParamsFetching(true));
    const response = await adminSubDeviceParamService.getSubDeviceParams(deviceId, subDeviceId, params);
    dispatch(storeSubDeviceParamsList(response));
    dispatch(setSubDeviceParamsFetching(false));
  } catch (e) {
    history.push('/notfound');
  }
};

const getSubDeviceParam = (deviceId, subDeviceId, paramName) => async dispatch => {
  try {
    dispatch(setFetchedEditableSubDeviceParam(true));
    dispatch(setSubDeviceParamProgress(true));
    const response = await adminSubDeviceParamService.getSubDeviceParam(deviceId, subDeviceId, paramName);
    dispatch(storeSubDeviceParam(response));
    dispatch(setSubDeviceParamProgress(false));
    return response;
  } catch (e) {
    history.push('/notfound');
  }
};

const addSubDeviceParam = (params, deviceId, subDeviceId) => async dispatch => {
  try {
    dispatch(setSubDeviceParamProgress(true));
    await adminSubDeviceParamService.addSubDeviceParam(params, deviceId, subDeviceId);
    dispatch(setSubDeviceParamProgress(false));
  } catch (e) {
    dispatch(authInterceptor.disconnect());
  }
};

const updateSubDeviceParam = (params, deviceId, subDeviceId, paramName) => async dispatch => {
  try {
    dispatch(setSubDeviceParamProgress(true));
    await adminSubDeviceParamService.updateSubDeviceParam(params, deviceId, subDeviceId, paramName);
    dispatch(setSubDeviceParamProgress(false));
  } catch (e) {
    dispatch(authInterceptor.disconnect());
  }
};

const deleteSubDeviceParam = (deviceId, subDeviceId, paramName) => async dispatch => {
  try {
    dispatch(setSubDeviceParamProgress(true));
    await adminSubDeviceParamService.deleteSubDeviceParam(deviceId, subDeviceId, paramName);
    dispatch(removeSubDeviceParam(paramName));
    dispatch(setSubDeviceParamProgress(false));
  } catch (e) {
    dispatch(authInterceptor.disconnect());
  }
};

export const adminSubDeviceParamActions = {
  getSubDeviceParam,
  getSubDeviceParams,
  storeSubDeviceParamsList,
  setFetchedSubDeviceParams,
  addSubDeviceParam,
  updateSubDeviceParam,
  deleteSubDeviceParam,
  clearSubDeviceParam,
  setSubDeviceParamToBeDeleted,
  unsetSubDeviceParamToBeDeleted,
};

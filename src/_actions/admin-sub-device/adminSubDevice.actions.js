import { editorDialogActions, errorActions } from '..';
import { adminSubDeviceConstants } from '../../_constants';
import { adminSubDeviceService } from '../../_services';

const storeSubDevicesList = response => dispatch => {
  dispatch({ type: adminSubDeviceConstants.STORE_SUB_DEVICES, payload: response });
};

const setFetchedSubDevices = flag => dispatch => {
  dispatch({ type: adminSubDeviceConstants.SET_FETCHED_SUB_DEVICES, payload: flag });
};

const storeSubDevice = response => dispatch => {
  dispatch({ type: adminSubDeviceConstants.STORE_SUB_DEVICE, payload: response });
};

const setSubDevicesFetching = flag => dispatch => {
  dispatch({ type: adminSubDeviceConstants.SET_FETCHING_SUB_DEVICES, payload: flag });
};

const setSubDeviceProgress = flag => dispatch => {
  dispatch({ type: adminSubDeviceConstants.SET_SUB_DEVICE_PROGRESS, payload: flag });
};

const setFetchedEditableSubDevice = flag => dispatch => {
  dispatch({ type: adminSubDeviceConstants.SET_FETCHED_EDITABLE_SUB_DEVICE, payload: flag });
};

const clearSubDevice = dispatch => {
  dispatch({ type: adminSubDeviceConstants.CLEAR_SUB_DEVICE });
};

const removeSubDevice = id => dispatch => {
  dispatch({ type: adminSubDeviceConstants.DELETE_SUB_DEVICE, payload: id });
};

const setSubDeviceToBeDeleted = id => dispatch => {
  dispatch({ type: adminSubDeviceConstants.SET_SUB_DEVICE_TO_BE_DELETED, payload: id });
};

const unsetSubDeviceToBeDeleted = id => dispatch => {
  dispatch({ type: adminSubDeviceConstants.UNSET_SUB_DEVICE_TO_BE_DELETED, payload: id });
};

const resetEditorSubDeviceDialog = () => dispatch => {
  dispatch(editorDialogActions.close());
  clearSubDevice(dispatch); // Cleanup
};

const refresh = (deviceId, hasDialog = true) => dispatch => {
  dispatch(adminSubDeviceActions.getSubDevices(deviceId, { sortBy: 'createdAt:desc', limit: 10, page: 1 })).then(() => {
    if (hasDialog) {
      dispatch(resetEditorSubDeviceDialog());
    }
  });
};

const getSubDevices = (deviceId, params) => async dispatch => {
  try {
    dispatch(setFetchedSubDevices(true));
    dispatch(setSubDevicesFetching(true));
    const response = await adminSubDeviceService.getSubDevices(deviceId, params);
    dispatch(storeSubDevicesList(response));
    dispatch(setSubDevicesFetching(false));
  } catch (e) {
    dispatch(errorActions.setError(e));
    dispatch(setSubDevicesFetching(false));
  }
};

const getSubDevice = (deviceId, subDeviceId) => async dispatch => {
  try {
    dispatch(setFetchedEditableSubDevice(true));
    dispatch(setSubDeviceProgress(true));
    const response = await adminSubDeviceService.getSubDevice(deviceId, subDeviceId);
    dispatch(storeSubDevice(response));
    dispatch(setSubDeviceProgress(false));
    return response;
  } catch (e) {
    dispatch(errorActions.setError(e));
    dispatch(setSubDeviceProgress(true));
  }
};

const addSubDevice = (params, deviceId) => async dispatch => {
  try {
    dispatch(setSubDeviceProgress(true));
    await adminSubDeviceService.addSubDevice(params, deviceId);
    dispatch(setSubDeviceProgress(false));
    dispatch(refresh(deviceId));
  } catch (e) {
    dispatch(errorActions.setError(e));
    dispatch(setSubDeviceProgress(true));
  }
};

const updateSubDevice = (params, deviceId, subDeviceId) => async dispatch => {
  try {
    dispatch(setSubDeviceProgress(true));
    await adminSubDeviceService.updateSubDevice(params, deviceId, subDeviceId);
    dispatch(setSubDeviceProgress(false));
    dispatch(refresh(deviceId));
  } catch (e) {
    dispatch(errorActions.setError(e));
    dispatch(setSubDeviceProgress(true));
  }
};

const deleteSubDevice = (deviceId, subDeviceId) => async dispatch => {
  try {
    dispatch(setSubDeviceProgress(true));
    await adminSubDeviceService.deleteSubDevice(deviceId, subDeviceId);
    dispatch(removeSubDevice(subDeviceId));
    dispatch(setSubDeviceProgress(false));
    dispatch(refresh(deviceId, false));
  } catch (e) {
    dispatch(errorActions.setError(e));
    dispatch(setSubDeviceProgress(true));
  }
};

export const adminSubDeviceActions = {
  getSubDevice,
  getSubDevices,
  storeSubDevicesList,
  setFetchedSubDevices,
  addSubDevice,
  updateSubDevice,
  deleteSubDevice,
  clearSubDevice,
  setSubDeviceToBeDeleted,
  unsetSubDeviceToBeDeleted,
  resetEditorSubDeviceDialog,
  refresh,
};

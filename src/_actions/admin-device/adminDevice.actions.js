import { editorDialogActions, errorActions } from '..';
import { adminDeviceConstants } from '../../_constants';
import { adminDeviceService } from '../../_services';

const storeDevicesList = response => dispatch => {
  dispatch({ type: adminDeviceConstants.STORE_DEVICES, payload: response });
};

const setFetchedDevices = flag => dispatch => {
  dispatch({ type: adminDeviceConstants.SET_FETCHED_DEVICES, payload: flag });
};

const storeDevice = response => dispatch => {
  dispatch({ type: adminDeviceConstants.STORE_DEVICE, payload: response });
};

const setDevicesFetching = flag => dispatch => {
  dispatch({ type: adminDeviceConstants.SET_FETCHING_DEVICES, payload: flag });
};

const setDeviceProgress = flag => dispatch => {
  dispatch({ type: adminDeviceConstants.SET_DEVICE_PROGRESS, payload: flag });
};

const setFetchedEditableDevice = flag => dispatch => {
  dispatch({ type: adminDeviceConstants.SET_FETCHED_EDITABLE_DEVICE, payload: flag });
};

const clearDevice = dispatch => {
  dispatch({ type: adminDeviceConstants.CLEAR_DEVICE });
};

const removeDevice = id => dispatch => {
  dispatch({ type: adminDeviceConstants.DELETE_DEVICE, payload: id });
};

const setDeviceToBeDeleted = id => dispatch => {
  dispatch({ type: adminDeviceConstants.SET_DEVICE_TO_BE_DELETED, payload: id });
};

const unsetDeviceToBeDeleted = id => dispatch => {
  dispatch({ type: adminDeviceConstants.UNSET_DEVICE_TO_BE_DELETED, payload: id });
};

const resetEditorDeviceDialog = () => dispatch => {
  dispatch(editorDialogActions.close());
  adminDeviceActions.clearDevice(dispatch); // Cleanup
};

const refresh = (hasDialog = true) => dispatch => {
  dispatch(adminDeviceActions.getDevices({ sortBy: 'createdAt:desc', limit: 10, page: 1 })).then(() => {
    if (hasDialog) {
      dispatch(resetEditorDeviceDialog());
    }
  });
};

const getDevices = params => async dispatch => {
  try {
    dispatch(setFetchedDevices(true));
    dispatch(setDevicesFetching(true));
    const response = await adminDeviceService.getDevices(params);
    dispatch(storeDevicesList(response));
    dispatch(setDevicesFetching(false));
  } catch (e) {
    dispatch(errorActions.setError(e));
  }
};

const getDevice = id => async dispatch => {
  try {
    dispatch(setFetchedEditableDevice(true));
    dispatch(setDeviceProgress(true));
    const response = await adminDeviceService.getDevice(id);
    dispatch(storeDevice(response));
    dispatch(setDeviceProgress(false));
    return response;
  } catch (e) {
    dispatch(errorActions.setError(e));
  }
};

const addDevice = params => async dispatch => {
  try {
    dispatch(setDeviceProgress(true));
    await adminDeviceService.addDevice(params);
    dispatch(setDeviceProgress(false));
    dispatch(refresh());
  } catch (e) {
    dispatch(errorActions.setError(e));
  }
};

const updateDevice = (params, id) => async dispatch => {
  try {
    dispatch(setDeviceProgress(true));
    await adminDeviceService.updateDevice(params, id);
    dispatch(setDeviceProgress(false));
    dispatch(refresh());
  } catch (e) {
    dispatch(errorActions.setError(e));
  }
};

const deleteDevice = id => async dispatch => {
  try {
    dispatch(setDeviceProgress(true));
    await adminDeviceService.deleteDevice(id);
    dispatch(removeDevice(id));
    dispatch(setDeviceProgress(false));
    dispatch(refresh(false));
  } catch (e) {
    dispatch(errorActions.setError(e));
  }
};

export const adminDeviceActions = {
  getDevice,
  getDevices,
  storeDevicesList,
  setFetchedDevices,
  addDevice,
  updateDevice,
  deleteDevice,
  clearDevice,
  setDeviceToBeDeleted,
  unsetDeviceToBeDeleted,
  resetEditorDeviceDialog,
  refresh,
};

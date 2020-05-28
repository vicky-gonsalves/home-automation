import { editorDialogActions, errorActions } from '..';
import { adminSharedDeviceAccessConstants } from '../../_constants';
import { adminSharedDeviceAccessService } from '../../_services';

const storeSharedDeviceAccessesList = response => dispatch => {
  dispatch({ type: adminSharedDeviceAccessConstants.STORE_SHARED_DEVICE_ACCESSES, payload: response });
};

const setFetchedSharedDeviceAccesses = flag => dispatch => {
  dispatch({ type: adminSharedDeviceAccessConstants.SET_FETCHED_SHARED_DEVICE_ACCESSES, payload: flag });
};

const storeSharedDeviceAccess = response => dispatch => {
  dispatch({ type: adminSharedDeviceAccessConstants.STORE_SHARED_DEVICE_ACCESS, payload: response });
};

const setSharedDeviceAccessesFetching = flag => dispatch => {
  dispatch({ type: adminSharedDeviceAccessConstants.SET_FETCHING_SHARED_DEVICE_ACCESSES, payload: flag });
};

const setSharedDeviceAccessProgress = flag => dispatch => {
  dispatch({ type: adminSharedDeviceAccessConstants.SET_SHARED_DEVICE_ACCESS_PROGRESS, payload: flag });
};

const setFetchedEditableSharedDeviceAccess = flag => dispatch => {
  dispatch({ type: adminSharedDeviceAccessConstants.SET_FETCHED_EDITABLE_SHARED_DEVICE_ACCESS, payload: flag });
};

const clearSharedDeviceAccess = dispatch => {
  dispatch({ type: adminSharedDeviceAccessConstants.CLEAR_SHARED_DEVICE_ACCESS });
};

const removeSharedDeviceAccess = id => dispatch => {
  dispatch({ type: adminSharedDeviceAccessConstants.DELETE_SHARED_DEVICE_ACCESS, payload: id });
};

const setSharedDeviceAccessToBeDeleted = id => dispatch => {
  dispatch({ type: adminSharedDeviceAccessConstants.SET_SHARED_DEVICE_ACCESS_TO_BE_DELETED, payload: id });
};

const unsetSharedDeviceAccessToBeDeleted = id => dispatch => {
  dispatch({ type: adminSharedDeviceAccessConstants.UNSET_SHARED_DEVICE_ACCESS_TO_BE_DELETED, payload: id });
};

const resetEditorSharedDeviceAccessDialog = () => dispatch => {
  dispatch(editorDialogActions.close('sharedDeviceAccess'));
  clearSharedDeviceAccess(dispatch); // Cleanup
};

const refresh = (deviceId, hasDialog = true) => dispatch => {
  dispatch(
    adminSharedDeviceAccessActions.getSharedDeviceAccesses(deviceId, { sortBy: 'createdAt:desc', limit: 10, page: 1 })
  ).then(() => {
    if (hasDialog) {
      dispatch(resetEditorSharedDeviceAccessDialog());
    }
  });
};

const getSharedDeviceAccesses = (deviceId, params) => async dispatch => {
  try {
    dispatch(setFetchedSharedDeviceAccesses(true));
    dispatch(setSharedDeviceAccessesFetching(true));
    const response = await adminSharedDeviceAccessService.getSharedDeviceAccesses(deviceId, params);
    dispatch(storeSharedDeviceAccessesList(response));
    dispatch(setSharedDeviceAccessesFetching(false));
  } catch (e) {
    dispatch(errorActions.setError(e));
    dispatch(setSharedDeviceAccessesFetching(false));
  }
};

const getSharedDeviceAccess = sharedDeviceAccessId => async dispatch => {
  try {
    dispatch(setFetchedEditableSharedDeviceAccess(true));
    dispatch(setSharedDeviceAccessProgress(true));
    const response = await adminSharedDeviceAccessService.getSharedDeviceAccess(sharedDeviceAccessId);
    dispatch(storeSharedDeviceAccess(response));
    dispatch(setSharedDeviceAccessProgress(false));
    return response;
  } catch (e) {
    dispatch(errorActions.setError(e));
    dispatch(setSharedDeviceAccessProgress(false));
  }
};

const addSharedDeviceAccess = (params, deviceId) => async dispatch => {
  const _params = params;
  _params.deviceId = deviceId;
  try {
    dispatch(setSharedDeviceAccessProgress(true));
    await adminSharedDeviceAccessService.addSharedDeviceAccess(_params);
    dispatch(setSharedDeviceAccessProgress(false));
    dispatch(refresh(deviceId));
  } catch (e) {
    dispatch(errorActions.setError(e));
    dispatch(setSharedDeviceAccessProgress(false));
  }
};

const updateSharedDeviceAccess = (params, deviceId, sharedDeviceAccessId) => async dispatch => {
  try {
    dispatch(setSharedDeviceAccessProgress(true));
    await adminSharedDeviceAccessService.updateSharedDeviceAccess(params, sharedDeviceAccessId);
    dispatch(setSharedDeviceAccessProgress(false));
    dispatch(refresh(deviceId));
  } catch (e) {
    dispatch(errorActions.setError(e));
    dispatch(setSharedDeviceAccessProgress(false));
  }
};

const deleteSharedDeviceAccess = (deviceId, sharedDeviceAccessId) => async dispatch => {
  try {
    dispatch(setSharedDeviceAccessProgress(true));
    await adminSharedDeviceAccessService.deleteSharedDeviceAccess(sharedDeviceAccessId);
    dispatch(removeSharedDeviceAccess(sharedDeviceAccessId));
    dispatch(setSharedDeviceAccessProgress(false));
    dispatch(refresh(deviceId, false));
  } catch (e) {
    dispatch(errorActions.setError(e));
    dispatch(setSharedDeviceAccessProgress(false));
  }
};

export const adminSharedDeviceAccessActions = {
  getSharedDeviceAccess,
  getSharedDeviceAccesses,
  storeSharedDeviceAccessesList,
  setFetchedSharedDeviceAccesses,
  addSharedDeviceAccess,
  updateSharedDeviceAccess,
  deleteSharedDeviceAccess,
  clearSharedDeviceAccess,
  setSharedDeviceAccessToBeDeleted,
  unsetSharedDeviceAccessToBeDeleted,
  resetEditorSharedDeviceAccessDialog,
  refresh,
};

import { editorDialogActions, errorActions } from '..';
import { adminUserConstants } from '../../_constants';
import { adminUserService } from '../../_services';

const storeUsersList = response => dispatch => {
  dispatch({ type: adminUserConstants.STORE_USERS, payload: response });
};

const setFetchedUsers = flag => dispatch => {
  dispatch({ type: adminUserConstants.SET_FETCHED_USERS, payload: flag });
};

const storeUser = response => dispatch => {
  dispatch({ type: adminUserConstants.STORE_USER, payload: response });
};

const setUsersFetching = flag => dispatch => {
  dispatch({ type: adminUserConstants.SET_FETCHING_USERS, payload: flag });
};

const setUserProgress = flag => dispatch => {
  dispatch({ type: adminUserConstants.SET_USER_PROGRESS, payload: flag });
};

const setFetchedEditableUser = flag => dispatch => {
  dispatch({ type: adminUserConstants.SET_FETCHED_EDITABLE_USER, payload: flag });
};

const clearUser = dispatch => {
  dispatch({ type: adminUserConstants.CLEAR_USER });
};

const removeUser = id => dispatch => {
  dispatch({ type: adminUserConstants.DELETE_USER, payload: id });
};

const setUserToBeDeleted = id => dispatch => {
  dispatch({ type: adminUserConstants.SET_USER_TO_BE_DELETED, payload: id });
};

const unsetUserToBeDeleted = id => dispatch => {
  dispatch({ type: adminUserConstants.UNSET_USER_TO_BE_DELETED, payload: id });
};

const resetEditUserDialog = () => dispatch => {
  dispatch(editorDialogActions.close('user'));
  adminUserActions.clearUser(dispatch); // Cleanup
};

const refresh = (hasDialog = true) => dispatch =>
  dispatch(adminUserActions.getUsers({ sortBy: 'createdAt:desc', limit: 10, page: 1 })).then(() => {
    if (hasDialog) {
      dispatch(resetEditUserDialog());
    }
  });

const getUsers = params => async dispatch => {
  try {
    dispatch(setFetchedUsers(true));
    dispatch(setUsersFetching(true));
    const response = await adminUserService.getUsers(params);
    dispatch(storeUsersList(response));
    dispatch(setUsersFetching(false));
  } catch (e) {
    dispatch(errorActions.setError(e));
    dispatch(setUsersFetching(false));
  }
};

const getUser = id => async dispatch => {
  try {
    dispatch(setFetchedEditableUser(true));
    dispatch(setUserProgress(true));
    const response = await adminUserService.getUser(id);
    dispatch(storeUser(response));
    dispatch(setUserProgress(false));
    return response;
  } catch (e) {
    dispatch(errorActions.setError(e));
    dispatch(setUserProgress(false));
  }
};

const addUser = params => async dispatch => {
  try {
    dispatch(setUserProgress(true));
    await adminUserService.addUser(params);
    dispatch(setUserProgress(false));
    dispatch(refresh());
  } catch (e) {
    dispatch(errorActions.setError(e));
    dispatch(setUserProgress(false));
  }
};

const updateUser = (params, id) => async dispatch => {
  try {
    dispatch(setUserProgress(true));
    await adminUserService.updateUser(params, id);
    dispatch(setUserProgress(false));
    dispatch(refresh());
  } catch (e) {
    dispatch(errorActions.setError(e));
    dispatch(setUserProgress(false));
  }
};

const deleteUser = id => async dispatch => {
  try {
    dispatch(setUserProgress(true));
    await adminUserService.deleteUser(id);
    dispatch(removeUser(id));
    dispatch(setUserProgress(false));
    dispatch(refresh(false));
  } catch (e) {
    dispatch(errorActions.setError(e));
    dispatch(setUserProgress(false));
  }
};

export const adminUserActions = {
  getUser,
  getUsers,
  storeUsersList,
  setFetchedUsers,
  addUser,
  updateUser,
  deleteUser,
  clearUser,
  setUserToBeDeleted,
  unsetUserToBeDeleted,
  resetEditUserDialog,
  refresh,
};

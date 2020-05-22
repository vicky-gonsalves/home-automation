import { adminUserConstants } from '../../_constants';
import { history } from '../../_helpers/history/history';
import { authInterceptor } from '../../_interceptors/auth/auth.interceptor';
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

const getUsers = params => async dispatch => {
  try {
    dispatch(setFetchedUsers(true));
    dispatch(setUsersFetching(true));
    const response = await adminUserService.getUsers(params);
    dispatch(storeUsersList(response));
    dispatch(setUsersFetching(false));
  } catch (e) {
    dispatch(authInterceptor.disconnect());
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
    history.push('/notfound');
  }
};

const addUser = params => async dispatch => {
  try {
    dispatch(setUserProgress(true));
    await adminUserService.addUser(params);
    dispatch(setUserProgress(false));
    history.push('/users');
  } catch (e) {
    dispatch(authInterceptor.disconnect());
  }
};

const updateUser = (params, id) => async dispatch => {
  try {
    dispatch(setUserProgress(true));
    await adminUserService.updateUser(params, id);
    dispatch(setUserProgress(false));
    history.push('/users');
  } catch (e) {
    dispatch(authInterceptor.disconnect());
  }
};

const deleteUser = id => async dispatch => {
  try {
    dispatch(setUserProgress(true));
    await adminUserService.deleteUser(id);
    dispatch(removeUser(id));
    dispatch(setUserProgress(false));
  } catch (e) {
    dispatch(authInterceptor.disconnect());
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
};

import { adminUserConstants } from '../../_constants';
import { authInterceptor } from '../../_interceptors/auth/auth.interceptor';
import { adminUserService } from '../../_services';

const storeUsersList = response => dispatch => {
  dispatch({ type: adminUserConstants.STORE_USERS, payload: response });
};

const setUsersFetching = flag => dispatch => {
  dispatch({ type: adminUserConstants.SET_FETCHING_USERS, payload: flag });
};

const getUsers = params => async dispatch => {
  try {
    dispatch(setUsersFetching(true));
    const response = await adminUserService.getUsers(params);
    dispatch(storeUsersList(response));
    dispatch(setUsersFetching(false));
  } catch (e) {
    dispatch(authInterceptor.disconnect());
  }
};
export const adminUserActions = {
  getUsers,
  storeUsersList,
};

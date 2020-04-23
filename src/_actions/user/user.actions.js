import { userConstants } from '../../_constants/user.constants';
import { userService } from '../../_services/user/user.service';

const setUser = userObj => {
  return {
    type: userConstants.SET_USER,
    payload: userObj,
  };
};

const setUserTokens = tokens => {
  return {
    type: userConstants.SET_USER_TOKENS,
    payload: { tokens },
  };
};

const setLoginError = error => {
  return {
    type: userConstants.SET_LOGIN_ERROR,
    payload: { error },
  };
};

const signIn = userObj => dispatch => {
  dispatch({
    type: userConstants.SIGN_IN,
  });
  userService
    .signInService(userObj.email, userObj.password, userObj.remember)
    .then(response => {
      // handle success
      dispatch(
        setUser({
          name: response.user.name,
          email: response.user.email,
          role: response.user.role,
          tokens: response.tokens,
        })
      );
      dispatch(setLoginError(null));
    })
    .catch(error => {
      // handle error
      dispatch(setLoginError(error));
    });
};

const signOut = () => dispatch => {
  dispatch({
    type: userConstants.SIGN_OUT,
  });
  userService.signOutService();
};

const me = () => {
  return userService.getMe();
};

const setDevicesFetched = flag => dispatch => {
  dispatch({
    type: userConstants.SET_FETCHED_DEVICES,
    payload: flag,
  });
};

export const userActions = {
  setUser,
  setLoginError,
  signIn,
  signOut,
  me,
  setUserTokens,
  setDevicesFetched,
};

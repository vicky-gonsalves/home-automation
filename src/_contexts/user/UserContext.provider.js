import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { socketActions, userActions } from '../../_actions';
import { userConstants } from '../../_constants';
import { authInterceptor } from '../../_interceptors/auth/auth.interceptor';

export const UserContext = React.createContext();

const UserContextProvider = props => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user, shallowEqual);
  const sockets = useSelector(state => state.socket, shallowEqual);

  const connected = sockets.connected;
  const isSocketFetching = sockets.isSocketFetching;
  const isLoggedIn = user.isLoggedIn && user.tokens !== null;
  const isAuthorized = user.isAuthorized;
  const isAdmin = isLoggedIn && user.role === 'admin';
  const token = user && user.tokens && user.tokens.access && user.tokens.access.token ? user.tokens.access.token : null;
  const hasFetchedDevices = user.hasFetchedDevices;
  authInterceptor.interceptRequests();
  createAuthRefreshInterceptor(axios, authInterceptor.refreshAuthLogic(dispatch));

  useEffect(() => {
    const fetchMe = () => {
      if (isLoggedIn && !isAuthorized && token) {
        userActions
          .me()
          .then(response => {
            if (response && response.data) {
              dispatch({
                type: userConstants.GET_ME,
                payload: { ...response.data },
              });
              if (token) {
                dispatch(socketActions.socketInit(token));
              }
            } else {
              dispatch(authInterceptor.disconnect());
            }
          })
          .catch(() => {
            dispatch(authInterceptor.disconnect());
          });
      }
    };
    fetchMe();
  }, [token, dispatch, isLoggedIn, isAuthorized]);

  return (
    <UserContext.Provider
      value={{ user, connected, isLoggedIn, isAuthorized, isAdmin, token, isSocketFetching, hasFetchedDevices }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;

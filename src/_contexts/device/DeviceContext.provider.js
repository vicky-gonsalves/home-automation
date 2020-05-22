import React, { useContext, useLayoutEffect, useMemo } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { deviceActions } from '../../_actions';
import { history } from '../../_helpers/history/history';
import { UserContext } from '../user/UserContext.provider';

export const DeviceContext = React.createContext();

const DeviceContextProvider = props => {
  const userContext = useContext(UserContext);
  const device = useSelector(state => state.device, shallowEqual);
  const socket = useSelector(state => state.socket, shallowEqual);
  const sharedDevice = useSelector(state => state.sharedDevice, shallowEqual);
  const deviceLoadPath = ['home'];
  const shouldLoad = useMemo(
    () =>
      Boolean(
        deviceLoadPath.filter(path => {
          return history.location.pathname.match(new RegExp(`(${path}?.+)`, 'gi'));
        }).length
      ),
    [deviceLoadPath]
  );

  const shouldFetchDevices = useMemo(() => {
    return (
      userContext.isLoggedIn &&
      userContext.token !== null &&
      userContext.isAuthorized &&
      socket.connected &&
      !userContext.hasFetchedDevices &&
      shouldLoad
    );
  }, [
    userContext.isAuthorized,
    userContext.isLoggedIn,
    userContext.token,
    socket.connected,
    userContext.hasFetchedDevices,
    shouldLoad,
  ]);

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const fetchDevices = () => {
      if (shouldFetchDevices) {
        dispatch(deviceActions.myDevices());
      }
    };
    fetchDevices();
  }, [dispatch, shouldFetchDevices]);

  return <DeviceContext.Provider value={{ device, sharedDevice }}>{props.children}</DeviceContext.Provider>;
};

export default DeviceContextProvider;

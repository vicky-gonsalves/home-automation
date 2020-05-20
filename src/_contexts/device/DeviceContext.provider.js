import React, { useContext, useEffect, useMemo } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { deviceActions } from '../../_actions';
import { UserContext } from '../user/UserContext.provider';

export const DeviceContext = React.createContext();

const DeviceContextProvider = props => {
  const userContext = useContext(UserContext);
  const device = useSelector(state => state.device, shallowEqual);
  const socket = useSelector(state => state.socket, shallowEqual);
  const sharedDevice = useSelector(state => state.sharedDevice, shallowEqual);

  const shouldFetchDevices = useMemo(() => {
    return (
      userContext.isLoggedIn &&
      userContext.token !== null &&
      userContext.isAuthorized &&
      socket.connected &&
      !userContext.hasFetchedDevices
    );
  }, [userContext.isAuthorized, userContext.isLoggedIn, userContext.token, socket.connected, userContext.hasFetchedDevices]);

  const dispatch = useDispatch();

  useEffect(() => {
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

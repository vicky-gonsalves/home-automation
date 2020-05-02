import React, { useContext, useEffect, useMemo } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { deviceActions } from '../../_actions';
import { UserContext } from '../user/UserContext.provider';

export const DeviceContext = React.createContext();

const DeviceContextProvider = props => {
  const userContext = useContext(UserContext);
  const device = useSelector(state => state.device, shallowEqual);
  const sharedDevice = useSelector(state => state.sharedDevice, shallowEqual);

  const isAuth = useMemo(() => {
    return userContext.isLoggedIn && userContext.token !== null && userContext.isAuthorized;
  }, [userContext.isAuthorized, userContext.isLoggedIn, userContext.token]);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchDevices = () => {
      if (isAuth) {
        dispatch(deviceActions.myDevices());
      }
    };
    fetchDevices();
  }, [dispatch, isAuth]);

  return <DeviceContext.Provider value={{ device, sharedDevice }}>{props.children}</DeviceContext.Provider>;
};

export default DeviceContextProvider;

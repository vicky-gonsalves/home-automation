import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';

export const DeviceParamContext = React.createContext();
const DeviceParamContextProvider = props => {
  const deviceParams = useSelector(state => state.deviceParam && state.deviceParam.deviceParams, shallowEqual);
  return <DeviceParamContext.Provider value={{ deviceParams }}>{props.children}</DeviceParamContext.Provider>;
};

export default DeviceParamContextProvider;

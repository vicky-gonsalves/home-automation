import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';

export const SubDeviceParamsContext = React.createContext();
const SubDeviceParamContextProvider = props => {
  const subDeviceParams = useSelector(state => state.subDeviceParam && state.subDeviceParam.subDeviceParams, shallowEqual);
  return <SubDeviceParamsContext.Provider value={{ subDeviceParams }}>{props.children}</SubDeviceParamsContext.Provider>;
};

export default SubDeviceParamContextProvider;

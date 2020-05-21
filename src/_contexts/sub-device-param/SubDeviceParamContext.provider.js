import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';

export const SubDeviceParamsContext = React.createContext();
const SubDeviceParamContextProvider = props => {
  const subDeviceParamsState = useSelector(state => state.subDeviceParam, shallowEqual);
  const subDeviceParams =
    subDeviceParamsState && subDeviceParamsState.subDeviceParams ? subDeviceParamsState.subDeviceParams : [];
  return <SubDeviceParamsContext.Provider value={{ subDeviceParams }}>{props.children}</SubDeviceParamsContext.Provider>;
};

export default SubDeviceParamContextProvider;

import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';

export const SubDeviceContext = React.createContext();
const SubDeviceContextProvider = props => {
  const subDevices = useSelector(state => state && state.subDevice && state.subDevice.subDevices, shallowEqual);
  return <SubDeviceContext.Provider value={{ subDevices }}>{props.children}</SubDeviceContext.Provider>;
};

export default SubDeviceContextProvider;

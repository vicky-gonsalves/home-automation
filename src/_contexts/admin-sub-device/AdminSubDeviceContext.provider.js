import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';

export const AdminSubDeviceContext = React.createContext();
const AdminSubDeviceContextProvider = props => {
  const adminSubDevice = useSelector(state => state && state.adminSubDevice, shallowEqual);
  return <AdminSubDeviceContext.Provider value={{ adminSubDevice }}>{props.children}</AdminSubDeviceContext.Provider>;
};

export default AdminSubDeviceContextProvider;

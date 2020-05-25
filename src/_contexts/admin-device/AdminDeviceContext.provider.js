import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';

export const AdminDeviceContext = React.createContext();
const AdminDeviceContextProvider = props => {
  const adminDevice = useSelector(state => state && state.adminDevice, shallowEqual);
  return <AdminDeviceContext.Provider value={{ adminDevice }}>{props.children}</AdminDeviceContext.Provider>;
};

export default AdminDeviceContextProvider;

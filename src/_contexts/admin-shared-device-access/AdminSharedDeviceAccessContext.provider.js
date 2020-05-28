import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';

export const AdminSharedDeviceAccessContext = React.createContext();
const AdminSharedDeviceAccessContextProvider = props => {
  const adminSharedDeviceAccesses = useSelector(state => state && state.adminSharedDeviceAccess, shallowEqual);
  return (
    <AdminSharedDeviceAccessContext.Provider value={{ adminSharedDeviceAccesses }}>
      {props.children}
    </AdminSharedDeviceAccessContext.Provider>
  );
};

export default AdminSharedDeviceAccessContextProvider;

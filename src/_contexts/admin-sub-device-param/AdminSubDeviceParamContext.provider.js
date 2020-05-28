import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';

export const AdminSubDeviceParamContext = React.createContext();
const AdminSubDeviceParamContextProvider = props => {
  const adminSubDeviceParam = useSelector(state => state && state.adminSubDeviceParam, shallowEqual);
  return (
    <AdminSubDeviceParamContext.Provider value={{ adminSubDeviceParam }}>
      {props.children}
    </AdminSubDeviceParamContext.Provider>
  );
};

export default AdminSubDeviceParamContextProvider;

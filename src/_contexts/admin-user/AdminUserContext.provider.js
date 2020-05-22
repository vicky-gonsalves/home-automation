import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';

export const AdminUserContext = React.createContext();
const AdminUserContextProvider = props => {
  const adminUser = useSelector(state => state && state.adminUser, shallowEqual);
  return <AdminUserContext.Provider value={{ adminUser }}>{props.children}</AdminUserContext.Provider>;
};

export default AdminUserContextProvider;

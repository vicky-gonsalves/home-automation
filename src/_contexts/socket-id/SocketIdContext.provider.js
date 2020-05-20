import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';

export const SocketIdContext = React.createContext();
const SocketIdContextProvider = props => {
  const socketIds = useSelector(state => state.onlineDevice, shallowEqual);
  return (
    <SocketIdContext.Provider value={{ onlineDevices: socketIds.onlineDevices }}>{props.children}</SocketIdContext.Provider>
  );
};

export default SocketIdContextProvider;

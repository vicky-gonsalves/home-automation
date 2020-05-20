import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';

export const LogContext = React.createContext();
const LogContextProvider = props => {
  const allLogs = useSelector(state => state.log && state.log.logs, shallowEqual);
  return <LogContext.Provider value={{ allLogs }}>{props.children}</LogContext.Provider>;
};

export default LogContextProvider;

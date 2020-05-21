import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';

export const LogContext = React.createContext();
const LogContextProvider = props => {
  const allLogsState = useSelector(state => state.log, shallowEqual);
  const allLogs = allLogsState && allLogsState.logs ? allLogsState.logs : [];
  return <LogContext.Provider value={{ allLogs }}>{props.children}</LogContext.Provider>;
};

export default LogContextProvider;

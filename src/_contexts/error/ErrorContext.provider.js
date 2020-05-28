import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';

export const ErrorContext = React.createContext();
const ErrorContextProvider = props => {
  const errorState = useSelector(state => state.error, shallowEqual);
  const message = errorState && errorState.message ? errorState.message : null;
  return <ErrorContext.Provider value={{ message }}>{props.children}</ErrorContext.Provider>;
};

export default ErrorContextProvider;

import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';

export const SettingDialogContext = React.createContext();
const SettingDialogContextProvider = props => {
  const settingDialog = useSelector(state => state.settingDialog, shallowEqual);
  return <SettingDialogContext.Provider value={{ settingDialog }}>{props.children}</SettingDialogContext.Provider>;
};

export default SettingDialogContextProvider;

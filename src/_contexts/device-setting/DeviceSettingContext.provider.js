import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';

export const DeviceSettingContext = React.createContext();
const DeviceSettingContextProvider = props => {
  const deviceSettingsState = useSelector(state => state.deviceSetting, shallowEqual);
  const deviceSettings = deviceSettingsState.deviceSettings;
  const isFetchingDeviceSetting = deviceSettingsState.isFetching;
  return (
    <DeviceSettingContext.Provider value={{ deviceSettings, isFetchingDeviceSetting }}>
      {props.children}
    </DeviceSettingContext.Provider>
  );
};

export default DeviceSettingContextProvider;

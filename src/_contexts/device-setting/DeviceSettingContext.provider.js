import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';

export const DeviceSettingContext = React.createContext();
const DeviceSettingContextProvider = props => {
  const deviceSettingsState = useSelector(state => state.deviceSetting, shallowEqual);
  const deviceSettings = deviceSettingsState && deviceSettingsState.deviceSettings ? deviceSettingsState.deviceSettings : [];
  const isFetchingDeviceSetting =
    deviceSettingsState && deviceSettingsState.hasOwnProperty('isFetching') ? deviceSettingsState.isFetching : false;
  return (
    <DeviceSettingContext.Provider value={{ deviceSettings, isFetchingDeviceSetting }}>
      {props.children}
    </DeviceSettingContext.Provider>
  );
};

export default DeviceSettingContextProvider;

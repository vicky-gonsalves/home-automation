import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';

export const SubDeviceSettingContext = React.createContext();
const SubDeviceSettingContextProvider = props => {
  const subDeviceSettingsState = useSelector(state => state.subDeviceSetting, shallowEqual);
  const subDeviceSettings = subDeviceSettingsState.subDeviceSettings;
  const isFetchingSubDeviceSetting = subDeviceSettingsState.isFetching;
  return (
    <SubDeviceSettingContext.Provider value={{ subDeviceSettings, isFetchingSubDeviceSetting }}>
      {props.children}
    </SubDeviceSettingContext.Provider>
  );
};

export default SubDeviceSettingContextProvider;

import { find, orderBy } from 'lodash';
import { deviceConstants } from '../../_constants';

const initialState = {
  isFetchingDevice: false,
  hasError: false,
  devices: [],
};

const device = (state = initialState, action) => {
  switch (action.type) {
    case deviceConstants.DEVICE_UPDATE_FETCHING:
      return {
        ...state,
        isFetchingDevice: action.payload,
      };
    case deviceConstants.DEVICE_STORE_ALL:
      return {
        ...state,
        isFetchingDevice: false,
        devices: action.payload,
      };
    case deviceConstants.DEVICE_GET_ERROR:
      return {
        ...state,
        isFetchingDevice: false,
        hasError: true,
        devices: [],
      };
    case deviceConstants.DEVICE_REMOVE_ALL:
      return {
        ...state,
        isFetchingDevice: false,
        hasError: false,
        devices: [],
      };
    case deviceConstants.DEVICE_UPDATED:
      const updateDevices = state.devices.map(device =>
        device.deviceId === action.payload.deviceId ? { ...action.payload } : device
      );
      let activeDevices = updateDevices.filter(device => !device.isDisabled);
      if (!action.payload.isDisabled && !find(activeDevices, { id: action.payload.id })) {
        activeDevices.push(action.payload);
        activeDevices = [...orderBy(activeDevices, ['createdAt', 'name'], ['asc', 'asc'])];
      }
      return {
        ...state,
        devices: activeDevices,
      };
    case deviceConstants.DEVICE_DELETED:
      return {
        ...state,
        devices: state.devices.filter(device => device.deviceId !== action.payload.deviceId),
      };
    case deviceConstants.DEVICE_CREATED:
      return {
        ...state,
        devices: [...state.devices, action.payload],
      };
    default:
      return state;
  }
};

export default device;

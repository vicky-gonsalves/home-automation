import { onlineDeviceConstants } from '../../_constants';

const initialState = {
  onlineDevices: [],
};

const onlineDevice = (state = initialState, action) => {
  switch (action.type) {
    case onlineDeviceConstants.ONLINE_DEVICE_STORE_ALL:
      return {
        ...state,
        onlineDevices: action.payload,
      };

    case onlineDeviceConstants.ONLINE_DEVICE_DELETED:
      return {
        ...state,
        onlineDevices: state.onlineDevices.filter(onlineDevice => onlineDevice.bindedTo !== action.payload.bindedTo),
      };

    case onlineDeviceConstants.ONLINE_DEVICE_REMOVE_ALL:
      return {
        ...state,
        onlineDevices: [],
      };

    case onlineDeviceConstants.ONLINE_DEVICE_CREATED:
      return {
        ...state,
        onlineDevices: [...state.onlineDevices, action.payload],
      };

    case onlineDeviceConstants.PARENT_DEVICE_DELETED_FOR_ONLINE_DEVICE:
      return {
        ...state,
        onlineDevices: state.onlineDevices.filter(onlineDevice => onlineDevice.bindedTo !== action.payload.bindedTo),
      };

    default:
      return state;
  }
};

export default onlineDevice;

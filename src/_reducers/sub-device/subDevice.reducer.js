import { subDeviceConstants } from '../../_constants';

const initialState = {
  subDevices: [],
};

const subDevice = (state = initialState, action) => {
  switch (action.type) {
    case subDeviceConstants.SUB_DEVICE_STORE_ALL:
      return {
        ...state,
        subDevices: action.payload,
      };

    case subDeviceConstants.SUB_DEVICE_REMOVE_ALL:
      return {
        ...state,
        subDevices: [],
      };

    case subDeviceConstants.SUB_DEVICE_UPDATED:
      return {
        ...state,
        subDevices: state.subDevices.map(subDevice =>
          subDevice.deviceId === action.payload.deviceId && subDevice.subDeviceId === action.payload.subDeviceId
            ? { ...action.payload }
            : subDevice
        ),
      };

    case subDeviceConstants.SUB_DEVICE_DELETED:
      return {
        ...state,
        subDevices: state.subDevices.filter(subDevice => subDevice.id !== action.payload.id),
      };

    case subDeviceConstants.SUB_DEVICE_CREATED:
      return {
        ...state,
        subDevices: [...state.subDevices, action.payload],
      };

    case subDeviceConstants.PARENT_DEVICE_DELETED_FOR_SUB_DEVICE:
      return {
        ...state,
        subDevices: state.subDevices.filter(subDevice => subDevice.deviceId !== action.payload.deviceId),
      };

    default:
      return state;
  }
};

export default subDevice;

import { find, orderBy } from 'lodash';
import { deviceParamConstants } from '../../_constants';

const initialState = {
  deviceParams: [],
};

const deviceParam = (state = initialState, action) => {
  switch (action.type) {
    case deviceParamConstants.DEVICE_PARAM_STORE_ALL:
      return {
        ...state,
        deviceParams: action.payload,
      };

    case deviceParamConstants.DEVICE_PARAM_REMOVE_ALL:
      return {
        ...state,
        deviceParams: [],
      };

    case deviceParamConstants.DEVICE_PARAM_UPDATED:
      const updateDeviceParams = state.deviceParams.map(deviceParam =>
        deviceParam.id === action.payload.id ? { ...action.payload } : deviceParam
      );
      let activeDeviceParams = updateDeviceParams.filter(deviceParam => !deviceParam.isDisabled);
      if (!action.payload.isDisabled && !find(activeDeviceParams, { id: action.payload.id })) {
        activeDeviceParams.push(action.payload);
        activeDeviceParams = [...orderBy(activeDeviceParams, ['createdAt', 'name'], ['asc', 'asc'])];
      }
      return {
        ...state,
        deviceParams: activeDeviceParams,
      };

    case deviceParamConstants.DEVICE_PARAM_DELETED:
      return {
        ...state,
        deviceParams: state.deviceParams.filter(deviceParam => deviceParam.id !== action.payload.id),
      };

    case deviceParamConstants.DEVICE_PARAM_CREATED:
      return {
        ...state,
        deviceParams: [...state.deviceParams, action.payload],
      };

    case deviceParamConstants.PARENT_DEVICE_DELETED_FOR_DEVICE_PARAM:
      return {
        ...state,
        deviceParams: state.deviceParams.filter(deviceParam => deviceParam.deviceId !== action.payload.deviceId),
      };

    default:
      return state;
  }
};

export default deviceParam;

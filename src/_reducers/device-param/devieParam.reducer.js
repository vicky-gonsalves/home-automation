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
      return {
        ...state,
        deviceParams: state.deviceParams.map(deviceParam =>
          deviceParam.id === action.payload.id ? { ...action.payload } : deviceParam
        ),
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

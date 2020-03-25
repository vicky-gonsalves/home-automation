import { subDeviceParamConstants } from '../../_constants';

const initialState = {
  subDeviceParams: [],
};

const subDeviceParam = (state = initialState, action) => {
  switch (action.type) {
    case subDeviceParamConstants.SUB_DEVICE_PARAM_STORE_ALL:
      return {
        ...state,
        subDeviceParams: action.payload,
      };

    case subDeviceParamConstants.SUB_DEVICE_PARAM_REMOVE_ALL:
      return {
        ...state,
        subDeviceParams: [],
      };

    case subDeviceParamConstants.SUB_DEVICE_PARAM_UPDATED:
      return {
        ...state,
        subDeviceParams: state.subDeviceParams.map(subDeviceParam =>
          subDeviceParam.id === action.payload.id ? { ...action.payload } : subDeviceParam
        ),
      };

    case subDeviceParamConstants.SUB_DEVICE_PARAM_DELETED:
      return {
        ...state,
        subDeviceParams: state.subDeviceParams.filter(subDeviceParam => subDeviceParam.id !== action.payload.id),
      };

    case subDeviceParamConstants.SUB_DEVICE_PARAM_CREATED:
      return {
        ...state,
        subDeviceParams: [...state.subDeviceParams, action.payload],
      };

    case subDeviceParamConstants.SUB_DEVICE_PARAM_UPDATE_STATUS:
      return {
        ...state,
        subDeviceParams: state.subDeviceParams.map(subDeviceParam =>
          subDeviceParam.id === action.payload.id ? { ...action.payload } : subDeviceParam
        ),
      };

    case subDeviceParamConstants.SUB_DEVICE_MULTI_STATUS_UPDATED:
      const params = state.subDeviceParams.map(subDeviceParam => {
        action.payload.forEach(payload => {
          if (payload.id === subDeviceParam.id) {
            subDeviceParam = payload;
          }
        });
        return subDeviceParam;
      });
      return {
        ...state,
        subDeviceParams: params,
      };

    case subDeviceParamConstants.PARENT_DEVICE_DELETED_FOR_SUB_DEVICE_PARAM:
      return {
        ...state,
        subDeviceParams: state.subDeviceParams.filter(subDeviceParam => subDeviceParam.deviceId !== action.payload.deviceId),
      };

    case subDeviceParamConstants.PARENT_SUB_DEVICE_DELETED_FOR_SUB_DEVICE_PARAM:
      const subDeviceParams = state.subDeviceParams.filter(
        subDeviceParam => subDeviceParam.subDeviceId !== action.payload.subDeviceId
      );
      return {
        ...state,
        subDeviceParams,
      };

    default:
      return state;
  }
};

export default subDeviceParam;

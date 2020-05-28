import { adminSubDeviceParamConstants } from '../../_constants';

const initialState = {
  isFetchingSubDeviceParamsList: false,
  fetchedSubDeviceParamsList: false,
  subDeviceParams: [],
  subDeviceParam: {},
  fetchedEditableSubDeviceParam: false,
  subDeviceParamInProgress: false,
  count: 0,
};

const adminSubDeviceParamParam = (state = initialState, action) => {
  switch (action.type) {
    case adminSubDeviceParamConstants.STORE_SUB_DEVICE_PARAMS:
      return {
        ...state,
        subDeviceParams: action.payload.subDeviceParams,
        count: action.payload.count,
      };

    case adminSubDeviceParamConstants.SET_FETCHING_SUB_DEVICE_PARAMS:
      return {
        ...state,
        isFetchingSubDeviceParamsList: action.payload,
      };

    case adminSubDeviceParamConstants.SET_FETCHED_SUB_DEVICE_PARAMS:
      return {
        ...state,
        fetchedSubDeviceParamsList: action.payload,
      };

    case adminSubDeviceParamConstants.STORE_SUB_DEVICE_PARAM:
      return {
        ...state,
        subDeviceParam: action.payload,
      };

    case adminSubDeviceParamConstants.SET_FETCHED_EDITABLE_SUB_DEVICE_PARAM:
      return {
        ...state,
        fetchedEditableSubDeviceParam: action.payload,
      };

    case adminSubDeviceParamConstants.SET_SUB_DEVICE_PARAM_PROGRESS:
      return {
        ...state,
        subDeviceParamInProgress: action.payload,
      };

    case adminSubDeviceParamConstants.CLEAR_SUB_DEVICE_PARAM:
      return {
        ...state,
        subDeviceParam: {},
        fetchedEditableSubDeviceParam: false,
      };

    case adminSubDeviceParamConstants.DELETE_SUB_DEVICE_PARAM:
      return {
        ...state,
        subDeviceParams: state.subDeviceParams.filter(subDeviceParam => subDeviceParam.paramName !== action.payload),
      };

    case adminSubDeviceParamConstants.SET_SUB_DEVICE_PARAM_TO_BE_DELETED:
      const subDeviceParams = [];
      state.subDeviceParams.forEach(subDeviceParam => {
        if (subDeviceParam.paramName === action.payload) {
          subDeviceParam.toBeDeleted = true;
        }
        subDeviceParams.push(subDeviceParam);
      });

      return {
        ...state,
        subDeviceParams,
      };

    case adminSubDeviceParamConstants.UNSET_SUB_DEVICE_PARAM_TO_BE_DELETED:
      const resetDevices = [];
      state.subDeviceParams.forEach(subDeviceParam => {
        if (subDeviceParam.paramName === action.payload) {
          subDeviceParam.toBeDeleted = false;
        }
        resetDevices.push(subDeviceParam);
      });

      return {
        ...state,
        subDeviceParams: resetDevices,
      };

    default:
      return state;
  }
};

export default adminSubDeviceParamParam;

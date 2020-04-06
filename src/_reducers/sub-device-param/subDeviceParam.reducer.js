import { find, orderBy } from 'lodash';
import { subDeviceParamConstants } from '../../_constants';

const initialState = {
  isFetching: false,
  subDeviceParamError: null,
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
      const updateSubDeviceParams = state.subDeviceParams.map(subDeviceParam =>
        subDeviceParam.id === action.payload.id ? { ...action.payload } : subDeviceParam
      );
      let activeSubDeviceParams = updateSubDeviceParams.filter(subDeviceParam => !subDeviceParam.isDisabled);
      if (!action.payload.isDisabled && !find(activeSubDeviceParams, { id: action.payload.id })) {
        activeSubDeviceParams.push(action.payload);
        activeSubDeviceParams = [...orderBy(activeSubDeviceParams, ['createdAt', 'name'], ['asc', 'asc'])];
      }
      return {
        ...state,
        subDeviceParams: activeSubDeviceParams,
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
      const _updateSubDeviceParams = state.subDeviceParams.map(subDeviceParam => {
        action.payload.forEach(payload => {
          if (payload.id === subDeviceParam.id) {
            subDeviceParam = payload;
          }
        });
        return subDeviceParam;
      });
      let _activeSubDeviceParams = _updateSubDeviceParams.filter(subDeviceParam => !subDeviceParam.isDisabled);
      if (!action.payload.isDisabled && !find(_activeSubDeviceParams, { id: action.payload.id })) {
        _activeSubDeviceParams.push(action.payload);
        _activeSubDeviceParams = [...orderBy(_activeSubDeviceParams, ['createdAt', 'name'], ['asc', 'asc'])];
      }
      return {
        ...state,
        subDeviceParams: _activeSubDeviceParams,
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

    case subDeviceParamConstants.SET_PROGRESS:
      return {
        ...state,
        isFetching: action.payload,
      };

    case subDeviceParamConstants.SET_SUB_DEVICE_PARAM_ERROR:
      return {
        ...state,
        subDeviceParamError: action.payload.error,
      };

    default:
      return state;
  }
};

export default subDeviceParam;

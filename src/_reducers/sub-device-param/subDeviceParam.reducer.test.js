import { subDeviceParamConstants } from '../../_constants';
import { deviceOne } from '../../_utils/fixtures/device.fixture';
import { subDeviceOne } from '../../_utils/fixtures/subDevice.fixture';
import {
  subDeviceParamEight,
  subDeviceParamFive,
  subDeviceParamFour,
  subDeviceParamOne,
  subDeviceParamSeven,
  subDeviceParamSix,
  subDeviceParamThree,
  subDeviceParamTwo,
} from '../../_utils/fixtures/subDeviceParam.fixture';
import subDeviceParam from './subDeviceParam.reducer';

describe('Sub Device Param Reducer', () => {
  beforeEach(() => {});

  it('should return default state', () => {
    const newState = subDeviceParam({}, {});
    expect(newState).toEqual({});
  });

  it('should return new state if SUB_DEVICE_PARAM_STORE_ALL', () => {
    const currentSubDeviceParam = {
      subDeviceParams: [subDeviceParamOne, subDeviceParamTwo],
    };
    const newState = subDeviceParam(
      {},
      {
        type: subDeviceParamConstants.SUB_DEVICE_PARAM_STORE_ALL,
        payload: currentSubDeviceParam.subDeviceParams,
      }
    );
    expect(newState).toEqual(currentSubDeviceParam);
  });

  it('should return new state if SUB_DEVICE_PARAM_REMOVE_ALL', () => {
    const currentSubDeviceParam = {
      subDeviceParams: [],
    };
    const newState = subDeviceParam(
      {},
      {
        type: subDeviceParamConstants.SUB_DEVICE_PARAM_REMOVE_ALL,
      }
    );
    expect(newState).toEqual(currentSubDeviceParam);
  });

  it('should return new state if SUB_DEVICE_PARAM_UPDATED', () => {
    const _initialState = {
      subDeviceParams: [subDeviceParamOne],
    };
    const currentSubDeviceParam = {
      subDeviceParams: [subDeviceParamOne],
    };
    const newState = subDeviceParam(_initialState, {
      type: subDeviceParamConstants.SUB_DEVICE_PARAM_UPDATED,
      payload: subDeviceParamOne,
    });
    expect(newState).toEqual(currentSubDeviceParam);
  });

  it('should push new sub device params and return new state if SUB_DEVICE_PARAM_UPDATED', () => {
    const _initialState = {
      subDeviceParams: [subDeviceParamOne],
    };
    const currentSubDeviceParam = {
      subDeviceParams: [subDeviceParamOne, subDeviceParamTwo],
    };
    const newState = subDeviceParam(_initialState, {
      type: subDeviceParamConstants.SUB_DEVICE_PARAM_UPDATED,
      payload: subDeviceParamTwo,
    });
    expect(newState).toEqual(currentSubDeviceParam);
  });

  it('should return new state if SUB_DEVICE_PARAM_DELETED', () => {
    const _initialState = {
      subDeviceParams: [subDeviceParamOne, subDeviceParamTwo],
    };
    const currentSubDeviceParam = {
      subDeviceParams: [subDeviceParamTwo],
    };
    const newState = subDeviceParam(_initialState, {
      type: subDeviceParamConstants.SUB_DEVICE_PARAM_DELETED,
      payload: subDeviceParamOne,
    });
    expect(newState).toEqual(currentSubDeviceParam);
  });

  it('should return new state if SUB_DEVICE_PARAM_CREATED', () => {
    const _initialState = {
      subDeviceParams: [],
    };
    const currentSubDeviceParam = {
      subDeviceParams: [subDeviceParamOne],
    };
    const newState = subDeviceParam(_initialState, {
      type: subDeviceParamConstants.SUB_DEVICE_PARAM_CREATED,
      payload: subDeviceParamOne,
    });
    expect(newState).toEqual(currentSubDeviceParam);
  });

  it('should return new state if SUB_DEVICE_PARAM_UPDATE_STATUS', () => {
    const _initialState = {
      subDeviceParams: [subDeviceParamOne],
    };
    const currentSubDeviceParam = {
      subDeviceParams: [subDeviceParamOne],
    };
    const newState = subDeviceParam(_initialState, {
      type: subDeviceParamConstants.SUB_DEVICE_PARAM_UPDATE_STATUS,
      payload: subDeviceParamOne,
    });
    expect(newState).toEqual(currentSubDeviceParam);
  });

  it('should return new state if SUB_DEVICE_MULTI_STATUS_UPDATED', () => {
    const _initialState = {
      subDeviceParams: [subDeviceParamOne, subDeviceParamTwo],
    };
    const currentDeviceSetting = {
      subDeviceParams: [subDeviceParamTwo, subDeviceParamOne],
    };
    const newState = subDeviceParam(_initialState, {
      type: subDeviceParamConstants.SUB_DEVICE_MULTI_STATUS_UPDATED,
      payload: [subDeviceParamOne, subDeviceParamTwo],
    });
    expect(newState).toEqual(currentDeviceSetting);
  });

  it('should push new sub device params settings and return new state if SUB_DEVICE_MULTI_STATUS_UPDATED', () => {
    const _initialState = {
      subDeviceParams: [subDeviceParamOne, subDeviceParamTwo],
    };
    const currentDeviceSetting = {
      subDeviceParams: [subDeviceParamTwo, subDeviceParamThree, subDeviceParamFour, subDeviceParamOne],
    };
    const newState = subDeviceParam(_initialState, {
      type: subDeviceParamConstants.SUB_DEVICE_MULTI_STATUS_UPDATED,
      payload: [subDeviceParamThree, subDeviceParamFour],
    });
    expect(newState).toEqual(currentDeviceSetting);
  });

  it('should return new state if PARENT_DEVICE_DELETED_FOR_SUB_DEVICE_PARAM', () => {
    const _initialState = {
      subDeviceParams: [
        subDeviceParamOne,
        subDeviceParamTwo,
        subDeviceParamThree,
        subDeviceParamFour,
        subDeviceParamFive,
        subDeviceParamSix,
        subDeviceParamSeven,
        subDeviceParamEight,
      ],
    };
    const currentSubDeviceParam = {
      subDeviceParams: [subDeviceParamFour, subDeviceParamFive, subDeviceParamSix, subDeviceParamSeven, subDeviceParamEight],
    };
    const newState = subDeviceParam(_initialState, {
      type: subDeviceParamConstants.PARENT_DEVICE_DELETED_FOR_SUB_DEVICE_PARAM,
      payload: deviceOne,
    });
    expect(newState).toEqual(currentSubDeviceParam);
  });

  it('should return new state if PARENT_SUB_DEVICE_DELETED_FOR_SUB_DEVICE_PARAM', () => {
    const _initialState = {
      subDeviceParams: [
        subDeviceParamOne,
        subDeviceParamTwo,
        subDeviceParamThree,
        subDeviceParamFour,
        subDeviceParamFive,
        subDeviceParamSix,
        subDeviceParamSeven,
        subDeviceParamEight,
      ],
    };
    const currentSubDeviceParam = {
      subDeviceParams: [
        subDeviceParamTwo,
        subDeviceParamFour,
        subDeviceParamFive,
        subDeviceParamSix,
        subDeviceParamSeven,
        subDeviceParamEight,
      ],
    };
    const newState = subDeviceParam(_initialState, {
      type: subDeviceParamConstants.PARENT_SUB_DEVICE_DELETED_FOR_SUB_DEVICE_PARAM,
      payload: subDeviceOne,
    });
    expect(newState).toEqual(currentSubDeviceParam);
  });

  it('should return new state if SET_PROGRESS', () => {
    const currentSubDeviceParam = {
      isFetching: true,
    };
    const newState = subDeviceParam(
      {},
      {
        type: subDeviceParamConstants.SET_PROGRESS,
        payload: currentSubDeviceParam.isFetching,
      }
    );
    expect(newState).toEqual(currentSubDeviceParam);
  });

  it('should return new state if SET_SUB_DEVICE_PARAM_ERROR', () => {
    const currentSubDeviceParam = {
      subDeviceParamError: 'some error',
    };
    const newState = subDeviceParam(
      {},
      {
        type: subDeviceParamConstants.SET_SUB_DEVICE_PARAM_ERROR,
        payload: { error: currentSubDeviceParam.subDeviceParamError },
      }
    );
    expect(newState).toEqual(currentSubDeviceParam);
  });
});

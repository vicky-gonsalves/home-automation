import { logConstants } from '../../_constants';
import { deviceOne } from '../../_utils/fixtures/device.fixture';
import { logOne, logTwo, logThree, logFour, logFive, logSix } from '../../_utils/fixtures/log.fixture';
import { subDeviceOne } from '../../_utils/fixtures/subDevice.fixture';
import log from './log.reducer';

describe('Log Reducer', () => {
  beforeEach(() => {});

  it('should return default state', () => {
    const newState = log({}, {});
    expect(newState).toEqual({});
  });

  it('should return new state if LOG_STORE_ALL', () => {
    const currentLog = {
      logs: [logOne, logTwo, logThree, logFour, logFive, logSix],
    };
    const newState = log(
      {},
      {
        type: logConstants.LOG_STORE_ALL,
        payload: currentLog.logs,
      }
    );
    expect(newState).toEqual(currentLog);
  });

  it('should return new state if LOG_REMOVE_ALL', () => {
    const _initialLogs = {
      logs: [logOne, logTwo, logThree, logFour, logFive, logSix],
    };
    const currentLog = {
      logs: [],
    };
    const newState = log(_initialLogs, {
      type: logConstants.LOG_REMOVE_ALL,
    });
    expect(newState).toEqual(currentLog);
  });

  it('should push return new state if PARENT_DEVICE_DELETED_FOR_LOG', () => {
    const _initialState = {
      logs: [logOne, logTwo, logThree, logFour, logFive, logSix],
    };
    const currentLog = {
      logs: [logThree, logFour, logFive],
    };
    const newState = log(_initialState, {
      type: logConstants.PARENT_DEVICE_DELETED_FOR_LOG,
      payload: deviceOne,
    });
    expect(newState).toEqual(currentLog);
  });

  it('should push return new state if LOG_CREATED', () => {
    const _initialState = {
      logs: [],
    };
    const currentLog = {
      logs: [logOne],
    };
    const newState = log(_initialState, {
      type: logConstants.LOG_CREATED,
      payload: logOne,
    });
    expect(newState).toEqual(currentLog);
  });

  it('should trim 5 logs and push return new state if LOG_CREATED', () => {
    const _initialState = {
      logs: [logOne, logOne, logOne, logOne, logOne],
    };
    const currentLog = {
      logs: [logTwo, logOne, logOne, logOne, logOne],
    };
    const newState = log(_initialState, {
      type: logConstants.LOG_CREATED,
      payload: logTwo,
    });
    expect(newState).toEqual(currentLog);
  });

  it('should push return new state if PARENT_SUB_DEVICE_DELETED_FOR_LOG', () => {
    const _initialState = {
      logs: [logOne, logTwo, logThree, logFour, logFive, logSix],
    };
    const currentLog = {
      logs: [logThree, logFour, logFive],
    };
    const newState = log(_initialState, {
      type: logConstants.PARENT_SUB_DEVICE_DELETED_FOR_LOG,
      payload: subDeviceOne,
    });
    expect(newState).toEqual(currentLog);
  });
});
